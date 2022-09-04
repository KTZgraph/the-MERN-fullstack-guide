import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

//jeśli dwa/więcej komponenty ze sobą blisko współpracują to mozna mieć je we wspólnym pliku;
// WARNING ale eksportuję tylko jeden komponent, ten wewnątrz używany NIE jest eksportowany

const ModalOverlay = (props) => {
  // wewnętrzny komponent
  const content = (
    //   konkatenacja klass - można podac swoja jako props className = extra flexibility
    //  style={props.style} flexibility dla inline stylów
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        {/* header na górze modalu */}
        <h2>{props.header}</h2>
      </header>
      <form
        //   (event) => event.preventDefault() żeby przez przypdaek gdy mamy przycisk nie reloadować strony
        // jeśli przekażemy nasza onSubmit funkcje przez propsy, to wtedy preventDefault jest jej odpowiedzialnością
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        {/* nie zawsze tego kontentu potrzebujemy, ale jeśli jest to część modalu to powinniśmy być w stanie  wyrenderować przekazane z rodzica komponent dziecka*/}
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {/* footer dalej w formularzu, można przekazać np przyciski a to byłoby trudne gdyby wszystko przekazącc przez prosp.children
          to pomaga w wizualnej separacji guzików od contentu
          */}
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return createPortal(content, document.getElementById("modal-hook"));
};

// WARNING React Portal (Modal też jest portalem) i semantyka
// Modal jest React Portal więc będzie gdzie indziej injected niż komponent który go używa the-MERN-fullstack-guide\frontent\src\places\components\PlaceItem.jsx
// i to jest mega fajne, ze portale sa w innych meijscach renderowane a niekonienczie w komponencie, w którym sa w kodzie importowane
// to semantycznie może być lepsze niż dodawanie tego obok listy miejsca np,: PlaceItem.jsx
// uzyskamy ten sam wygląd jakby komponent był obok for screen redeares and so on - co nie byłoby idealny for semantical - to jest to w czym portale mogą nam pomóc
const Modal = (props) => {
  // mam osobny komponent na ModalOverlay bo sam Modal to coś wiecej niż overlay
  //   Modal wymaga backdrop a dodatkowo chcę dodac małą animację do otwierania i zamykania modalu
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        {/* przekazanie wszystkich propsów do wewnętrznego intercal component komponentu */}
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
