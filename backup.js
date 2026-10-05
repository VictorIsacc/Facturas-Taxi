import {validateCompany,validateService,documentKinds,correctionData,docNumber} from './core.js?v=10';
export const numberKey=d=>`${d.kind}:${d.year}:${d.seq}`;
export function sameDocument(a,b){return a.id===b.id&&a.kind===b.kind&&a.year===b.year&&a.seq===b.seq&&a.created===b.created&&JSON.stringify(a.data)===JSON.stringify(b.data);}
export function validateBackup(raw){
if(!raw||raw.format!=='taxi-apc-granada'||![1,2].includes(raw.version)||!Array.isArray(raw.documents)||!Array.isArray(raw.counters)||raw.documents.length>10000)throw new Error('No es una copia JSON compatible con esta aplicación.');
const company=raw.company?validateCompany(raw.company):null,ids=new Set(),numbers=new Set();
const documents=raw.documents.map(d=>{
 if(!d||typeof d.id!=='string'||! /^[a-f0-9-]{36}$/i.test(d.id)||!documentKinds.includes(d.kind)||!Number.isInteger(d.year)||!Number.isInteger(d.seq)||d.seq<1||d.seq>99999999||!d.data||Number.isNaN(Date.parse(d.created)))throw new Error('La copia contiene un documento no válido.');
 const data=validateService(d.data.service,d.data.company),expected=d.kind.startsWith('invoice')?'invoice':'receipt';
 if(data.service.kind!==expected||Number(data.service.date.slice(0,4))!==d.year)throw new Error('La numeración y la fecha de un documento no coinciden.');
 if(ids.has(d.id)||numbers.has(numberKey(d)))throw new Error('La copia contiene números o identificadores duplicados.');
 ids.add(d.id);numbers.add(numberKey(d));return{id:d.id,kind:d.kind,year:d.year,seq:d.seq,created:new Date(d.created).toISOString(),data};
});
const byId=new Map(documents.map(d=>[d.id,d])),successors=new Set();
for(let i=0;i<documents.length;i++){
 const document=documents[i],meta=raw.documents[i].data.correction,isCorrection=document.kind.endsWith('-correction');
 if(isCorrection){
  if(!meta||raw.version!==2)throw new Error('Faltan los datos de la corrección.');
  const source=byId.get(meta.sourceId);
  if(!source||source.id===document.id||source.data.service.kind!==document.data.service.kind||successors.has(source.id))throw new Error('La corrección no tiene un original válido o está duplicada.');
  const expected=correctionData(source,meta.reason);
  if(Object.keys(expected).some(k=>meta[k]!==expected[k]))throw new Error('Los datos de la factura o recibo original no coinciden.');
  document.data.correction=expected;successors.add(source.id);
 }else if(meta)throw new Error('Un documento normal no puede incluir datos de rectificación.');
}
for(const document of documents){const visited=new Set();let current=document;while(current?.data.correction){if(visited.has(current.id))throw new Error('La copia contiene correcciones enlazadas en círculo.');visited.add(current.id);current=byId.get(current.data.correction.sourceId);}}
if(documents.length&&!company)throw new Error('Faltan los datos del titular en la copia.');
if(company&&documents.some(d=>d.data.company.nif.toUpperCase()!==company.nif.toUpperCase()))throw new Error('La copia contiene documentos de distintos titulares.');
const counters=raw.counters.map(c=>{if(!documentKinds.includes(c.kind)||!Number.isInteger(c.year)||c.year<2000||c.year>2100||!Number.isInteger(c.next)||c.next<1||c.next>100000000)throw new Error('El contador de la copia no es válido.');return{kind:c.kind,year:c.year,next:c.next};});return{company,documents,counters};}
export function mergeBackup(existing,backup){if(existing.company&&backup.company&&existing.company.nif.toUpperCase()!==backup.company.nif.toUpperCase())throw new Error('Esta copia pertenece a otro titular. No se mezclarán sus facturas con las tuyas.');const ids=new Map(existing.documents.map(d=>[d.id,d])),numbers=new Map(existing.documents.map(d=>[numberKey(d),d]));const additions=[];for(const d of backup.documents){const conflict=ids.get(d.id)||numbers.get(numberKey(d));if(conflict){if(!sameDocument(conflict,d))throw new Error(`Hay un conflicto en ${docNumber(d)}. No se ha importado ni sobrescrito ningún dato.`);}else{additions.push(d);ids.set(d.id,d);numbers.set(numberKey(d),d);}}const sources=new Set();for(const d of ids.values()){if(d.data.correction){if(sources.has(d.data.correction.sourceId))throw new Error('Hay dos correcciones distintas del mismo documento. No se ha importado ningún dato.');sources.add(d.data.correction.sourceId);}}const counters=new Map();for(const c of [...existing.counters,...backup.counters]){const key=`${c.kind}:${c.year}`;counters.set(key,{...c,next:Math.max(c.next,counters.get(key)?.next||1)});}for(const d of ids.values()){const key=`${d.kind}:${d.year}`;counters.set(key,{kind:d.kind,year:d.year,next:Math.max(d.seq+1,counters.get(key)?.next||1)});}return{company:existing.company||backup.company,documents:additions,counters:[...counters.values()],imported:additions.length,skipped:backup.documents.length-additions.length};}
