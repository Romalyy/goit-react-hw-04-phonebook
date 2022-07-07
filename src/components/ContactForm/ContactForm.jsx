import { memo, useState } from "react";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState(
    {
      name: '',
      number: '',
    })
  
  const { name, number } = state;

 const handleChange = ({ target }) => {
    const { name, value } = target;

    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ ...state});

    setState({
      name: "",
      number: "",
    });
  };

  return (
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
};

// class ContactForm extends Component {
//   state = {
//     name: "",
//     number: "",
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     this.props.onSubmit( this.state );

//     this.setState({
//       name: "",
//       number: "",
//     });
//   };

//   render() {
//     return (
//       <form className={s.form} onSubmit={this.handleSubmit}>
//         <label className={s.label}>
//           Name
//           <input
//             className={s.input}
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label className={s.label}>
//           Number
//           <input
//             className={s.input}
//             type="tel"
//             name="number"
//             value={this.state.number}
//             onChange={this.handleChange}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <button className={s.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(ContactForm);
