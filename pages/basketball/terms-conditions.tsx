import { Box, Button, FormControlLabel, FormHelperText, Grid, Switch, Typography } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";

interface IFormInput {
    accepted?: Boolean
}

const LIPSUM = 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vulputate mattis ullamcorper. Morbi sed euismod lacus, venenatis cursus velit. Cras consectetur pharetra nulla in ultrices. Maecenas eu placerat sapien, sit amet lacinia justo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin volutpat ut lacus sed sollicitudin. Sed vel erat non velit ultrices luctus. Nam at lacus accumsan, pretium velit in, aliquam dolor. Aliquam sit amet ex eu metus feugiat ultricies non non velit. Nulla facilisi. Maecenas eget vehicula arcu, eget elementum dolor. In vel porta diam, a fermentum dolor. In ac pellentesque ex. Nunc convallis lacinia turpis, in varius mi condimentum sit amet.

Sed euismod nulla sed purus tempor commodo. Suspendisse egestas varius est auctor congue. Cras ut augue vel dui efficitur imperdiet eget ac ligula. Praesent vestibulum ex eget velit ultrices dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce nisl felis, sagittis vel ante ac, ullamcorper dapibus ex. Pellentesque sed laoreet lectus. Donec nibh orci, ornare at bibendum commodo, condimentum eget libero. Maecenas vel lorem quam. Praesent nunc mauris, dignissim non porta vehicula, dapibus sit amet justo. Vestibulum lorem nulla, lobortis ut leo nec, cursus viverra nunc. Aliquam fringilla consectetur finibus.

Nulla quis feugiat libero. Vivamus sed dignissim orci. Fusce ut aliquet quam. Etiam tempor at sapien a elementum. Nulla facilisi. Praesent finibus vel lectus non lobortis. Vestibulum leo libero, consequat quis turpis et, sodales volutpat magna. Suspendisse quis accumsan arcu, eu eleifend nulla. Maecenas mi libero, rhoncus et est quis, accumsan aliquam libero. Cras sapien neque, condimentum ac convallis in, faucibus et turpis. Mauris mauris magna, iaculis quis accumsan nec, dictum nec neque. Nam efficitur imperdiet ullamcorper.

Nulla pharetra, nisi et mattis dignissim, turpis metus suscipit ipsum, vitae consequat ipsum turpis eget dui. Curabitur id magna nec ipsum feugiat mollis. In est ante, malesuada scelerisque sollicitudin vulputate, interdum at sem. Vivamus nulla purus, vestibulum eu tincidunt nec, pulvinar sit amet odio. Aliquam varius at neque sit amet ultricies. Curabitur non dapibus odio. Aenean eu nisi id erat fringilla efficitur. Vivamus congue ipsum id risus vehicula consequat. Duis nisi dui, tincidunt in interdum ac, efficitur quis arcu. Duis mattis erat tellus, et posuere metus semper a. Phasellus pharetra vitae sapien nec ultricies. Duis consequat rhoncus convallis. Fusce id volutpat lacus, sit amet volutpat augue. Proin porttitor erat magna. Ut malesuada condimentum ultrices.

Fusce sed imperdiet ligula, viverra interdum tellus. Sed finibus ac enim sed ornare. Praesent risus sapien, tristique at laoreet eu, faucibus eu mi. Proin maximus turpis et elit blandit, quis fermentum massa auctor. Ut ipsum diam, pretium ut urna et, porttitor dapibus libero. Pellentesque sed rutrum elit. Vestibulum luctus turpis quis justo ultrices, nec dignissim ex ultrices. Maecenas posuere hendrerit lectus, facilisis fringilla libero semper eget. Donec in velit est. Integer egestas ex non scelerisque commodo. In pulvinar dictum efficitur. Fusce mattis in erat eget eleifend.
`;

export default function TermsConditions() {
    const [errorMessage, setErrorMessage] = React.useState('');
    const { register, formState: { isValid }, handleSubmit, control } = useForm();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
    const onSubmitError: SubmitErrorHandler<IFormInput> = errors => {
        setErrorMessage('Cannot proceed until terms and conditions are accepted.');
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="stretch">
            <Grid item md={12} lg={4}>
            <Typography variant="h4" gutterBottom align="center">
                Terms And Conditions
            </Typography>
                <Box
                    sx={{
                        mb: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 400,
                        overflow: "hidden",
                        overflowY: "scroll",
                        typography: 'body1',
                        }}
                >{LIPSUM}
                </Box>
                <form onSubmit={handleSubmit(onSubmit, onSubmitError)} style={{ display: "flex", flexDirection: "column" }}>
                    <Controller
                        name="accepted"
                        control={control}
                        rules={{ validate: value => value === true }}
                        render={({ field }) => <FormControlLabel
                            control={<Switch
                                {...field}
                                onChange={(e) => {
                                    setErrorMessage('');
                                    field.onChange(e);
                                }}
                            />}
                            label="I have read and accepted the terms and conditions"
                        />}
                    />
                    <FormHelperText error={true}>{errorMessage}</FormHelperText>
                    <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Proceed</Button>
                </form>
            </Grid>
        </Grid>
    );

}