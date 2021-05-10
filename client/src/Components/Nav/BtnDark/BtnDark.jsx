import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch } from 'react-redux';
import { setDarkMode } from '../../../Redux/Dark/darkActions'
import NightsStayIcon from '@material-ui/icons/NightsStay';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
const DarkSwitch = withStyles({
    switchBase: {
        color: '#9abf15',
        '&$checked': {
            color: '#2C3A40',
        },
        '&$checked + $track': {
            backgroundColor: '#9abf15',
        },
    },
    checked: {},
    track: {},
})(Switch);

export default function BtnDark() {
    const dispatch = useDispatch()
    const [dark, setDark] = React.useState(false);


    const handleChange = () => {
        setDark(!dark)
    };

    useEffect(() => {
        dispatch(setDarkMode(dark))
    }, [dispatch, dark])


    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <DarkSwitch
                        checked={dark}
                        onChange={handleChange}
                    />
                }
                label={dark ? <NightsStayIcon style={{ fontSize: "1.5rem", textAlign: "center", display: "flex", alignItems: "center" }} /> : <WbSunnyIcon style={{ fontSize: "1.5rem", display: "flex", alignItems: "center" }} />}
            />
        </FormGroup>
    );
}