import Header from "../components/Header";

import "../styles/form.css";

import EmailPic from "";
import Forms from "../components/Form/Form";

const Contact = () => {
  return (
    <>
      <Header></Header>

      <div className="form-container">
        <div>
          <img src={EmailPic} id="imgContato" />
        </div>
        <Forms opt="contato"></Forms>
      </div>
    </>
  );
};

export default Contact;
