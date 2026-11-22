import{mkdirSync,readdirSync,readFileSync,writeFileSync,existsSync}from'node:fs';
import{join}from'node:path';
const T=[1,18,66,5,7,11,12,16,0,0,0,0,0,0,0,0,10,10,10,10,10,10,10,6,10,10,10,6,10,10,10,0,10,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,33,37,37,33,1,0,0,0,0,0,0,0,0,0,0,0,6,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,2,5];
function run(p:Uint8Array,g:Uint8Array):{out:Uint8Array;code:number}{
const n=p.length,D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256),o=new Uint8Array(65536);let l=0,q=0,pc=0,k=0;const E=new TextEncoder(),d=(v:number)=>({out:o.slice(0,l),code:v});
for(;;){
if(k===1e6)return d(10);
if(pc<0||pc>=n)return d(9);
const op=p[pc],v=T[op];
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
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1];break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=D[s-1],a=D[s-2];let r:number;
if(op===16)r=a+b;
else if(op===17)r=a-b;
else if(op===18)r=Math.imul(a,b);
else if(op===19){if(b===0)return d(4);r=a===-2147483648&&b===-1?a:(a/b)|0;}
else if(op===20){if(b===0)return d(4);r=b===-1?0:a%b;}
else if(op===21){if(b===0)return d(4);r=Math.floor((a>>>0)/(b>>>0));}
else if(op===22){if(b===0)return d(4);r=(a>>>0)%(b>>>0);}
else if(op===24)r=a&b;
else if(op===25)r=a|b;
else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);
else if(op===29)r=a>>(b&31);
else if(op===30)r=a>>>(b&31);
else if(op===32)r=a===b?1:0;
else if(op===33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;
break;}
case 48:case 49:case 50:{
const rel=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;let take=true;
if(op!==48){const v=D[--s];take=op===49?v===0:v!==0;}
if(take)pc=nx+rel;
break;}
case 51:
if(c===64)return d(7);
C[c++]=nx;pc=p[nx-2]|(p[nx-1]<<8);
break;
case 52:
if(c===0)return d(8);
pc=C[--c];
break;
case 64:{
const a=D[s-1];
if(a<0||a>=256)return d(6);
D[s-1]=M[a];
break;}
case 65:{
const a=D[s-1],v=D[s-2];
if(a<0||a>=256)return d(6);
s-=2;M[a]=v;
break;}
case 80:{
const y=E.encode(String(D[s-1]));
if(l+y.length>65536)return d(11);
s--;o.set(y,l);l+=y.length;
break;}
case 81:
if(l+1>65536)return d(11);
o[l++]=D[--s]&255;
break;
case 82:D[s++]=q<g.length?g[q++]:-1;break;
case 83:return d(D[--s]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const dir=join(I,id),p=new Uint8Array(readFileSync(join(dir,'program.bin'))),ip=join(dir,'input.bin'),g=new Uint8Array(existsSync(ip)?readFileSync(ip):[]),r=run(p,g);
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),r.out);
writeFileSync(join(O,id,'exit.txt'),r.code+'\n');
}
