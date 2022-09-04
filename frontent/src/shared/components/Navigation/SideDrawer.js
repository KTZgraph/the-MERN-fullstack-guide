import { createPortal } from "react-dom";
import "./SideDrawer.css";

// WARNING React Portal szczególnie interesujace gdy zagnieżdżone w mocno zagnieżdżonych komponentach, bo pozwala na wyrenderowanie elementu w całkiem innym miejscu niż komponent w którym się zanjduje
// tutaj SideDrawer znajduje się w the-MERN-fullstack-guide\frontent\src\shared\components\Navigation\MainNavigation.js
// komponent jest elementem drzewa DOM/drzewa komponentów, ale kontent jest wyrenderowany gdzie indziej - to jest portal

const SideDrawer = (props) => {
  // można też zapisywać JSX do zmiennej, nie tylko go zwracać
  const content = <aside className="side-drawer">{props.children}</aside>;

  // https://stackoverflow.com/questions/69974866/why-reactdom-createportal-does-not-work-in-my-content-script
  return createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
