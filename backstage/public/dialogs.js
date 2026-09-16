// In-page dialogs also work in embedded browsers without window.prompt/confirm.
let queue=Promise.resolve();
function openDialog(message,{value,notice=false}={}){
  const task=()=>new Promise(resolve=>{
    const dialog=document.createElement('dialog');
    dialog.className='editor-dialog';
    const form=document.createElement('form');form.method='dialog';
    const label=document.createElement('label');label.className='field';
    const title=document.createElement('strong');title.id='editorDialogTitle';title.textContent=message;
    dialog.setAttribute('aria-labelledby',title.id);label.append(title);
    let input;
    if(value!==undefined){input=document.createElement('input');input.value=value;input.name='answer';input.autocomplete='off';label.append(input);}
    form.append(label);
    const actions=document.createElement('div');actions.className='actions';
    if(!notice){const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancelar';cancel.addEventListener('click',()=>dialog.close('cancel'));actions.append(cancel);}
    const ok=document.createElement('button');ok.className='primary';ok.type='submit';ok.textContent=notice?'Fechar':'Confirmar';actions.append(ok);form.append(actions);dialog.append(form);
    form.addEventListener('submit',event=>{event.preventDefault();dialog.close('ok');});
    dialog.addEventListener('close',()=>{const accepted=dialog.returnValue==='ok';const result=input?(accepted?input.value:null):accepted;dialog.remove();resolve(result);},{once:true});
    document.body.append(dialog);dialog.showModal();(input||ok).focus();input?.select();
  });
  const pending=queue.then(task);queue=pending.catch(()=>{});return pending;
}
export const askText=(message,value='')=>openDialog(message,{value});
export const askConfirm=message=>openDialog(message);
export const showMessage=message=>openDialog(message,{notice:true});
