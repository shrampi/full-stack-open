
import ControlledTextInput from "./ControlledTextInput";

const AddContactForm = (props) => {
  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={props.addName}>
        <ControlledTextInput label="name:" onChange={props.onNameChange} value={props.name} />
        <ControlledTextInput label="number:" onChange={props.onNumberChange} value={props.number} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default AddContactForm;