import React from'react';

const CreateInput = (props) => (

	<form onSubmit= {props.submit} className="login-form" >
		<label htmlFor='nickname'>
			<h2> Add a Name </h2>
		</label>

		<input
			ref={(input) => {this.textInput = input}}
			type="text"
			id="nickname"
			value={props.nickname}
			onChange={props.handlechange}
			placeholder={"Name"}
		/>
	    
	</form>

)

export default CreateInput;