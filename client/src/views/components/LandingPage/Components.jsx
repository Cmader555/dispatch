import React from "react";
import Input from '@material-ui/core/Input';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";



class LandingPage extends React.Component {

    state = {
        username: "",
        password: ""
    }

    render() {
        return (
            <div>
                <div className="logIn">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Username</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </div>

            </div>
        )
    }
}

export default (LandingPage)