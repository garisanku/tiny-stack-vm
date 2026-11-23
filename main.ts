import{mkdirSync,readdirSync,readFileSync,writeFileSync,existsSync}from'node:fs';
const T=`"3c&(,-1!!!!!!!!+++++++'+++'+++!+++!!!!!!!!!!!!!BFFB"!!!!!!!!!!!'*!!!!!!!!!!!!!!&&#&`;
function run(p:Uint8Array,g:Uint8Array){
const n=p.length,D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256),o=new Uint8Array(65536);let l=0,q=0,pc=0,k=0;const d=(v:number)=>({out:o.slice(0,l),code:v});
for(;;){
if(k===1e6)return d(10);
if(pc>>>0>=n)return d(9);
const op=p[pc],v=T.charCodeAt(op)-33;
if(!v)return d(5);
const w=v-1,im=w>>4,po=(w>>2)&3,pu=w&3;
if(pc+im>=n)return d(9);
k++;
const nx=pc+1+im;
if(s<po)return d(2);
if(s-po+pu>256)return d(3);
pc=nx;
switch(op){
case 0:return d(0);
case 1:D[s++]=p[nx-1]<<24>>24;break;
case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
case 6:D[s]=D[s-2];s++;break;
case 7:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
case 23:D[s-1]*=-1;break;
case 27:D[s-1]^=-1;break;
default:{
const b=D[s-1],a=D[s-2];let r:number;
if(op>18&&op<23&&!b)return d(4);
if(op===16)r=a+b;
else if(op===17)r=a-b;
else if(op===18)r=Math.imul(a,b);
else if(op===19)r=a==1<<31&&!~b?a:(a/b)|0;
else if(op===20)r=!~b?0:a%b;
else if(op===21)r=(a>>>0)/(b>>>0)|0;
else if(op===22)r=(a>>>0)%(b>>>0);
else if(op===24)r=a&b;
else if(op===25)r=a|b;
else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);
else if(op===29)r=a>>(b&31);
else if(op===30)r=a>>>(b&31);
else if(op===32)r=+(a===b);
else if(op===33)r=+(a<b);
else r=+((a>>>0)<(b>>>0));
s-=2;D[s++]=r;
break;}
case 48:case 49:case 50:{
const rel=(p[nx-2]|p[nx-1]<<8)<<16>>16;
if(op===48||!D[--s]===(op===49))pc=nx+rel;
break;}
case 51:
if(c===64)return d(7);
C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;
break;
case 52:
if(c===0)return d(8);
pc=C[--c];
break;
case 64:{
const a=D[s-1];
if(a>>>0>255)return d(6);
D[s-1]=M[a];
break;}
case 65:{
const a=D[s-1],v=D[s-2];
if(a>>>0>255)return d(6);
s-=2;M[a]=v;
break;}
case 80:
const y=Buffer.from(String(D[s-1]));
if(l+y.length>65536)return d(11);
s--;o.set(y,l);l+=y.length;
break;
case 81:
if(l+1>65536)return d(11);
o[l++]=D[--s]&255;
break;
case 82:D[s++]=g[q++]??-1;break;
case 83:return d(D[--s]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const d=I+'/'+id,p=readFileSync(d+'/program.bin'),i=d+'/input.bin',g=existsSync(i)?readFileSync(i):new Uint8Array(0),r=run(p,g),o=O+'/'+id;
mkdirSync(o,{recursive:true});
writeFileSync(o+'/stdout.bin',r.out);
writeFileSync(o+'/exit.txt',r.code+'\n');
}
