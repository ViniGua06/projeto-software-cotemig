import Header from "../components/Header";

import "../styles/form.css";

import Forms from "../components/Form/Form";

const Contact = () => {
  return (
    <>
      <Header></Header>

      <div className="form-container">
        
        <Forms opt="contato"></Forms>
      </div>
    </>
  );
};

export default Contact;
