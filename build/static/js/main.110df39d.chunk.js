(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{16:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),c=t.n(a),r=t(15),u=t.n(r),o=(t(6),t(4)),l=t(2),i=t(3),m=t.n(i),s="http://localhost:3001/api/persons",f=function(){return m.a.get(s).then((function(e){return e.data}))},d=function(e){return m.a.post(s,e).then((function(e){return e.data}))},h=function(e){return m.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},b=function(e,n){return m.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.errorMessage,t=e.successMessage;return null===n&&null===t?null:null!==t?c.a.createElement("div",{className:"success"},t):c.a.createElement("div",{className:"error"},n)},E=function(e){var n=e.newSearch,t=e.onSearchChange;return c.a.createElement("div",null,"filter shown with ",c.a.createElement("input",{value:n,onChange:t}))},g=function(e){var n=e.persons,t=e.newSearch,a=e.DeleteContact;return t.length>0?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return c.a.createElement("p",{key:e.name},e.name," ",e.number," ",c.a.createElement("button",{onClick:function(){return a(e)}},"delete"))})):n.map((function(e){return c.a.createElement("p",{key:e.name},e.name," ",e.number,c.a.createElement("button",{onClick:function(){return a(e)}},"delete"))}))},v=function(e){var n=e.addName,t=e.newName,a=e.newNumber,r=e.handleNameChange,u=e.handleNumberChange;return c.a.createElement("form",{onSubmit:n},c.a.createElement("div",null,"name: ",c.a.createElement("input",{value:t,onChange:r}),c.a.createElement("br",null),"number: ",c.a.createElement("input",{value:a,onChange:u})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add")))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],s=i[1],w=Object(a.useState)(""),j=Object(l.a)(w,2),C=j[0],O=j[1],N=Object(a.useState)(""),S=Object(l.a)(N,2),k=S[0],y=S[1],D=Object(a.useState)(null),M=Object(l.a)(D,2),T=M[0],A=M[1],I=Object(a.useState)(null),J=Object(l.a)(I,2),L=J[0],q=J[1];Object(a.useEffect)((function(){console.log("effect"),f().then((function(e){r(e)}))}),[]);return c.a.createElement("div",null,c.a.createElement("h1",null,"Phonebook"),c.a.createElement(p,{errorMessage:T,successMessage:L}),c.a.createElement(E,{newsearch:k,onSearchChange:function(e){y(e.target.value)}}),c.a.createElement("h1",null,"Add a new"),c.a.createElement(v,{addName:function(e){if(e.preventDefault(),t.filter((function(e){return e.name===m})).length>0){var n=t.find((function(e){return e.name===m})),a=Object(o.a)(Object(o.a)({},n),{},{number:C}),c=n.id;b(c,a).then((function(e){r(t.map((function(n){return n.id!==c?n:e}))),s(""),O(""),q("Updated ".concat(n.name,"'s contact number!")),setTimeout((function(){q(null)}),5e3)})).catch((function(e){A("Information of ".concat(m," has already been removed from server")),setTimeout((function(){A(null)}),5e3),s(""),O("")}))}else if(0===m.length)alert("Name is required for adding to the phonebook");else{d({name:m,number:C}).then((function(e){r(t.concat(e)),s(""),O(""),q("Added ".concat(e.name," to contacts")),setTimeout((function(){q(null)}),5e3)})).catch((function(e){console.log("failed to add to contacts")}))}},newName:m,newNumber:C,handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){O(e.target.value)}}),c.a.createElement("h1",null,"Numbers"),c.a.createElement(g,{persons:t,newSearch:k,DeleteContact:function(e){!0===window.confirm("Delete ".concat(e.name," ?"))&&h(e.id).then((function(n){console.log(n);var a=t.filter((function(n){return n.name!==e.name}));r(a),q("Deleted ".concat(e.name," from contacts!")),setTimeout((function(){q(null)}),5e3)})).catch((function(e){console.log("failed to delete contact")}))}}))};u.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(w,null)),document.getElementById("root"))},6:function(e,n,t){}},[[16,1,2]]]);
//# sourceMappingURL=main.110df39d.chunk.js.map