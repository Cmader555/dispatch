import React from "react";
import Input from '@material-ui/core/Input';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import swal from 'sweetalert';
import API from '../../../utils/API'


class LandingPage extends React.Component {

    state = {
        userID: "",
        password: ""
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
    
        const user = {
          userID: this.state.userID,
          password: this.state.password
        };
    
        API.userLogin(user)
          .then(({ data }) => {
            //console.log("yo", data.user._id)
            // this.setState({
            //   _id: data.user._id,
            //   token: data.token
            // })
            swal("log in was successful")
    
          })
          .catch((err) => {
            console.log(err)
            swal("Oops", "You entered the wrong password or username!", "error")
          });
    
      };

    render() {
        const logIn = {
            display: "block"
        };
        return (
            <div>
                <div>
                    <FormControl style={logIn}>
                        <InputLabel htmlFor="userID">User ID</InputLabel>
                        <Input
                            value={this.state.userID}
                            onChange={this.handleInputChange}
                            id="userID"
                            aria-describedby="my-helper-text"
                            name="userID"
                        />
                    </FormControl>
                    <FormControl style={logIn}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            id="password"
                            aria-describedby="my-helper-text"
                            name="password"
                        />
                    </FormControl>
                </div>

            </div>
        )
    }
}

export default (LandingPage)