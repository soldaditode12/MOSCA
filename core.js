(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.MoscaCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
function calcHand(scores,entries){
 if(entries.reduce((a,e)=>a+(e.skip?0:e.bases),0)!==5)throw Error('Entre los jugadores que juegan deben sumar exactamente 5 bases.');
 let next=[],events=[];
 entries.forEach((e,i)=>{let s=scores[i],n=s,ev='';
  if(e.skip){if(s<=4){n=s+1;ev='NO JUEGA +1'}else ev='NO JUEGA'}
  else if(e.ren){const rp=Number.isFinite(Number(e.renPoints))?Number(e.renPoints):15;n=s+rp;ev=`RENUNCIE +${rp}${e.bases?` · ${e.bases} base${e.bases===1?'':'s'} computada${e.bases===1?'':'s'}`:''}`}
  else{n=Math.max(0,s-e.bases);if(e.bases===0){n+=5;ev='CAPOTE +5'}}
  next.push(n);events.push(ev)
 });return{scores:next,events};
}
function resolveWinners(scores,entries){const zero=scores.map((s,i)=>s===0?i:-1).filter(i=>i>=0);if(zero.length<=1)return zero;const max=Math.max(...zero.map(i=>entries[i]?.bases||0));return zero.filter(i=>(entries[i]?.bases||0)===max)}
function settleShared(scores,winners){if(!winners.length)return scores.map(()=>0);const ws=new Set(winners),rem=scores.reduce((a,s,i)=>ws.has(i)?a:a+s,0),share=rem/winners.length;return scores.map((s,i)=>ws.has(i)?share:-s)}
return{calcHand,resolveWinners,settleShared};
});
