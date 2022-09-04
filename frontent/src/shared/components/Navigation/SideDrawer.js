import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

// WARNING React Portal szczególnie interesujace gdy zagnieżdżone w mocno zagnieżdżonych komponentach, bo pozwala na wyrenderowanie elementu w całkiem innym miejscu niż komponent w którym się zanjduje
// tutaj SideDrawer znajduje się w the-MERN-fullstack-guide\frontent\src\shared\components\Navigation\MainNavigation.js
// komponent jest elementem drzewa DOM/drzewa komponentów, ale kontent jest wyrenderowany gdzie indziej - to jest portal

const SideDrawer = (props) => {
  // można też zapisywać JSX do zmiennej, nie tylko go zwracać
  const content = (
    // in prop mówi bibliotece kiedy ma być widoczne; props.show od rodzica props
    //timeout 200ms
    //classNames - dodatkowe 's' na końcu - to jest specjalny props do tej biblioteki
    // "slide-in-left" - nazwa klasy CSS z głównego pliku styli the-MERN-fullstack-guide\frontent\src\index.css
    // SPECJALNE NAZWY KLASY .slide-in-left-enter , .slide-in-left-enter-active, .slide-in-left-exit , .slide-in-left-exit-active
    //mountOnEnter pozwala na usuwanie komoponentu <aside> z drzewa DOM, bez tego jest tylko animacja ale NIE usuwa komponentu z drzewa
    //unmountOnExit pozwala na usuwanie komoponentu <aside> z drzewa DOM, bez tego jest tylko animacja ale NIE usuwa komponentu z drzewa
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      {/* onClick bo mobilne menu po klniknieciu pozycji w menu samo się nie zamyka */}
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  // https://stackoverflow.com/questions/69974866/why-reactdom-createportal-does-not-work-in-my-content-script
  return createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
