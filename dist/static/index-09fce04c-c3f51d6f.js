import{s as b,B as x,r as l,j as d,P as j,a as o,b as v,u as B,c as H,d as I,e as k,f as E,A as g,g as y}from"./sanity-ab7ba122.js";var u;function C(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function O(t){const{actionHandlers:e,index:a,menuItems:n,menuItemGroups:r,title:i}=t,{features:s}=B();return!(n!=null&&n.length)&&!i?null:o(H,{actions:o(I,{menuItems:n,menuItemGroups:r,actionHandlers:e}),backButton:s.backButton&&a>0&&o(k,{as:E,"data-as":"a",icon:g,mode:"bleed"}),title:i})}const A=b(x)(u||(u=C([`
  position: relative;
`])));function L(t){const{children:e}=t,{collapsed:a}=y();return o(A,{hidden:a,height:"fill",overflow:"auto",children:e})}function _(t){const{index:e,pane:a,paneKey:n,...r}=t,{child:i,component:s,menuItems:m,menuItemGroups:p,title:f="",type:T,...P}=a,[c,h]=l.useState(null);return d(j,{id:n,minWidth:320,selected:r.isSelected,children:[o(O,{actionHandlers:c==null?void 0:c.actionHandlers,index:e,menuItems:m,menuItemGroups:p,title:f}),d(L,{children:[v.isValidElementType(s)&&l.createElement(s,{...r,...P,ref:h,child:i,paneKey:n}),l.isValidElement(s)&&s]})]})}export{_ as default};
