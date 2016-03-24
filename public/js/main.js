/**
 *
 * @param message
 * @param title
 * @param size
 */
function showModalMessage(message, title, size){
    bootbox.dialog({
        message : message,
        title : title == null?'提示':title,
        onEscape : true,
        size:size == null?'large':size,
        buttons:{
            confirmBtn:{
                label:'确认',
                className:'button button-primary button-small',
                callback:bootbox.hideAll()
            }
        }
    })
}

function showModalMessageWithEvent(message, title, size,e){
    bootbox.dialog({
        message : message,
        title : title == null?'提示':title,
        onEscape : true,
        size:size == null?'large':size,
        buttons:{
            confirmBtn:{
                label:'确认',
                className:'button button-primary button-small',
                callback:e
            }
        }
    })
}


function showConfirmMessage(message, title, size, e){
    bootbox.dialog({
        message : message,
        title : title == null?'提示':title,
        onEscape : true,
        closeButton: false,
        size:size == null?'large':size,
        buttons:{
            cancelBtn:{
                label:'取消',
                className:'button button-small',
                callback:bootbox.hideAll()
            },
            confirmBtn:{
              label:'确认',
                className:'button button-primary button-small',
                callback:e
            }
        }
    });
}
