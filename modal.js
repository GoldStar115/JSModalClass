function openModal() {
    var modalTrigger = document.getElementsByClassName('jsModalTrigger');
    for (var i = 0; i < modalTrigger.length; i++) {
        modalTrigger[i].onclick = function () {
            var target = this.getAttribute('href').substr(1);
            var modalWindow = document.getElementById(target);
            modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
        }
    }
}
function closeModal() {
    var yesButton = document.getElementsByClassName('jsModalClose_YES');
    var cancelButton = document.getElementsByClassName('jsModalClose_CANCEL');
    var closeOverlay = document.getElementsByClassName('jsOverlay');
    for (var i = 0; i < yesButton.length; i++) {
        yesButton[i].onclick = function () {
            var modalWindow = this.parentNode.parentNode;
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            callBackClick("YES", modalWindow.getAttribute("id"))
        }
    }
    for (var i = 0; i < cancelButton.length; i++) {
        cancelButton[i].onclick = function () {
            var modalWindow = this.parentNode.parentNode;
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            callBackClick("Cancel", modalWindow.getAttribute("id"))
        }
    }
    for (var i = 0; i < closeOverlay.length; i++) {
        closeOverlay[i].onclick = function () {
            var modalWindow = this.parentNode;
            modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}
function callBackClick(btnTitle, parent) {
    var node = document.createElement("P");
    var textnode = document.createTextNode(`You just clicked "${btnTitle}" from "${parent}"`);         // Create a text node
    node.appendChild(textnode);
    document.body.appendChild(node)
}
class MessageModal {
    constructor(title) {
        this.title = title;
        this.open = this.readyOpen(openModal);
        this.close = this.readyClose(closeModal());
    }
    readyClose(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    readyOpen(fn) {
        let innerHTML = document.body.innerHTML;
        const bodyHTML = `${innerHTML}${this.render()}`
        document.body.innerHTML = bodyHTML;
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    render() {
        return (
            `<a href="#${this.title}" id="popup" class="jsModalTrigger">${this.title}</a>
                        <div id="${this.title}" class="modal">
                            <div class="modal__overlay jsOverlay"></div>
                            <div class="modal__container">
                                <p>Are you sure you want to continue?</p>                                                        
                                <button class="modal__close jsModalClose">&#10005;</button>
                                <br /><br /><br />
                                <button class="jsModalClose_YES">Yes</button>
                                <button class="jsModalClose_CANCEL">Cancel</button>
                            </div>
                        </div>`
        )
    }
}
new MessageModal('Button1');
new MessageModal('Button2');
new MessageModal('Button3');
new MessageModal('Button4');
