import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            username: '',
            password: '',
            demoUsername: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demo = this.demo.bind(this);
    }

    componentDidMount() {
        const fetchRequestOption = {
            method: 'GET',
        };

        fetch(`/api/users/${parseInt(Math.random() * 10 + 1)}`, fetchRequestOption)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        demoUsername: result.username
                    })
                },
                (error) => {
                    this.setState({
                        // isLoaded: true,
                        error
                    });
                }
            );
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user)
            .then(() => this.props.history.push('/client/hives/1'));
    }

    demo(e) {
        e.preventDefault()
        const data = this.state.demoUsername.split(' ')[1].split('');
        const usernameField = document.getElementById('username_field');
        function keystroke(i = 0) {
            if (i < data.length) {
                usernameField.value += data[i];
                setTimeout(keystroke, 200, ++i);
            }
        };
        keystroke();

        const passwordField = document.getElementById('password_field');
        const pwData = 'demopw'.split('');
        function pwKeystroke(j = 0) {
            if (j < pwData.length) {
                passwordField.value += pwData[j];
                setTimeout(pwKeystroke, 200, ++j);
            }
        };
        pwKeystroke();

        setTimeout(() => {
            const userInfo = {
                username: this.state.demoUsername,
                password: 'demopw'
            };
            this.props.processForm(userInfo)
                .then(() => this.props.history.push('/client/hives/1'));
        }, 2000);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const signupForm = this.props.formType === 'Create an Account' ? (
            <div>
                <label data-qa-formtext="true">
                    <input 
                        type="text"
                        value={this.state.fname}
                        onChange={this.update('fname')}
                        className="c-input_text c-input_text--large p-get_started_email_form__input"
                        placeholder="First Name"
                    />
                </label>
                <label data-qa-formtext="true">
                    <input type="text"
                        value={this.state.lname}
                        onChange={this.update('lname')}
                        className="c-input_text c-input_text--large p-get_started_email_form__input"
                        placeholder="Last Name"
                    />
                </label>
                <label data-qa-formtext="true">
                    <input type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        className="c-input_text c-input_text--large p-get_started_email_form__input" 
                        id="signup_email" 
                        placeholder="Email"
                    />
                </label>
            </div>
        ) : "";

        const demoLogin = this.props.formType === 'Sign In with Username' ? (
            <button className="c-button c-button--outline c-button--large p-get_started_email_form__button p-get_started_aubergine_button" id="demo_btn" data-style="expand-right" data-qa="submit_button" onClick={this.demo}>Demo</button>
        ) : "";

        return (
            <div id="get_started_app_root" data-qa="page_contents" className="get-started-app-root" data-reactroot="">
                <header className="p-refreshed_page__header">
                    <div className="left-col"></div>
                    <div className="center-col">
                        {/* <a target="_self" className="c-link" href="/" rel="noopener noreferrer"><img alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34" title="Slack" /></a> */}
                                                <a className="link-1bIkeG logoLink-38lqtu" aria-label="Home" href="/">
                            {/* <svg width="124" height="34" viewBox="0 0 124 34" className="logo-3LF899">
                            <g fill="#ffffff">
                                <path d="M18.1558 14.297C17.1868 14.297 16.4218 15.13 16.4218 16.167C16.4218 17.204 17.2038 18.037 18.1558 18.037C19.1248 18.037 19.8898 17.204 19.8898 16.167C19.8898 15.13 19.1078 14.297 18.1558 14.297ZM11.9508 14.297C10.9818 14.297 10.2168 15.13 10.2168 16.167C10.2168 17.204 10.9988 18.037 11.9508 18.037C12.9198 18.037 13.6848 17.204 13.6848 16.167C13.7018 15.13 12.9198 14.297 11.9508 14.297Z"></path>
                                <path d="M26.4178 0.152954H3.63783C1.71683 0.152954 0.152832 1.71695 0.152832 3.63795V26.418C0.152832 28.339 1.71683 29.903 3.63783 29.903H22.9158L22.0148 26.792L24.1908 28.798L26.2478 30.685L29.9198 33.864V3.63795C29.9028 1.71695 28.3388 0.152954 26.4178 0.152954ZM19.8558 22.168C19.8558 22.168 19.2438 21.437 18.7338 20.808C20.9608 20.179 21.8108 18.802 21.8108 18.802C21.1138 19.261 20.4508 19.584 19.8558 19.805C19.0058 20.162 18.1898 20.383 17.3908 20.536C15.7588 20.842 14.2628 20.757 12.9878 20.519C12.0188 20.332 11.1858 20.077 10.4888 19.788C10.0978 19.635 9.67283 19.448 9.24783 19.21C9.19683 19.176 9.14583 19.159 9.09483 19.125C9.06083 19.108 9.04383 19.091 9.02683 19.091C8.72083 18.921 8.55083 18.802 8.55083 18.802C8.55083 18.802 9.36683 20.145 11.5258 20.791C11.0158 21.437 10.3868 22.185 10.3868 22.185C6.62983 22.066 5.20183 19.618 5.20183 19.618C5.20183 14.195 7.64983 9.79195 7.64983 9.79195C10.0978 7.97295 12.4098 8.02395 12.4098 8.02395L12.5798 8.22795C9.51983 9.09495 8.12583 10.438 8.12583 10.438C8.12583 10.438 8.49983 10.234 9.12883 9.96195C10.9478 9.16295 12.3928 8.95895 12.9878 8.89095C13.0898 8.87395 13.1748 8.85695 13.2768 8.85695C14.3138 8.72095 15.4868 8.68695 16.7108 8.82295C18.3258 9.00995 20.0598 9.48595 21.8278 10.438C21.8278 10.438 20.4848 9.16295 17.5948 8.29595L17.8328 8.02395C17.8328 8.02395 20.1618 7.97295 22.5928 9.79195C22.5928 9.79195 25.0408 14.195 25.0408 19.618C25.0408 19.601 23.6128 22.049 19.8558 22.168ZM45.5258 7.42895H39.8818V13.77L43.6388 17.153V10.999H45.6448C46.9198 10.999 47.5488 11.611 47.5488 12.597V17.306C47.5488 18.292 46.9538 18.955 45.6448 18.955H39.8648V22.542H45.5088C48.5348 22.559 51.3738 21.046 51.3738 17.578V12.512C51.3908 8.97595 48.5518 7.42895 45.5258 7.42895ZM75.1058 17.578V12.376C75.1058 10.506 78.4718 10.081 79.4918 11.951L82.6028 10.693C81.3788 8.00695 79.1518 7.22495 77.2988 7.22495C74.2728 7.22495 71.2808 8.97595 71.2808 12.376V17.578C71.2808 21.012 74.2728 22.729 77.2308 22.729C79.1348 22.729 81.4128 21.794 82.6708 19.346L79.3388 17.816C78.5228 19.907 75.1058 19.397 75.1058 17.578ZM64.8208 13.09C63.6478 12.835 62.8658 12.41 62.8148 11.679C62.8828 9.92795 65.5858 9.85995 67.1668 11.543L69.6658 9.62195C68.1018 7.71795 66.3338 7.20795 64.5148 7.20795C61.7438 7.20795 59.0578 8.77195 59.0578 11.73C59.0578 14.603 61.2678 16.15 63.6988 16.524C64.9398 16.694 66.3168 17.187 66.2828 18.037C66.1808 19.652 62.8488 19.567 61.3358 17.731L58.9218 19.992C60.3328 21.811 62.2538 22.729 64.0558 22.729C66.8268 22.729 69.9038 21.131 70.0228 18.207C70.1928 14.518 67.5068 13.583 64.8208 13.09ZM53.4308 22.525H57.2388V7.42895H53.4308V22.525ZM117.64 7.42895H111.996V13.77L115.753 17.153V10.999H117.759C119.034 10.999 119.663 11.611 119.663 12.597V17.306C119.663 18.292 119.068 18.955 117.759 18.955H111.979V22.542H117.64C120.666 22.559 123.505 21.046 123.505 17.578V12.512C123.505 8.97595 120.666 7.42895 117.64 7.42895ZM89.9468 7.22495C86.8188 7.22495 83.7078 8.92495 83.7078 12.41V17.561C83.7078 21.012 86.8358 22.746 89.9808 22.746C93.1088 22.746 96.2198 21.012 96.2198 17.561V12.41C96.2198 8.94195 93.0748 7.22495 89.9468 7.22495ZM92.3948 17.561C92.3948 18.649 91.1708 19.21 89.9638 19.21C88.7398 19.21 87.5158 18.683 87.5158 17.561V12.41C87.5158 11.305 88.7058 10.71 89.8958 10.71C91.1368 10.71 92.3948 11.237 92.3948 12.41V17.561ZM109.888 12.41C109.803 8.87395 107.389 7.44595 104.278 7.44595H98.2428V22.542H102.102V17.748H102.782L106.284 22.542H111.044L106.93 17.357C108.749 16.779 109.888 15.198 109.888 12.41ZM104.346 14.45H102.102V10.999H104.346C106.743 10.999 106.743 14.45 104.346 14.45Z"></path>
                            </g>
                            </svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="40pt" height="38.4pt" viewBox="0 0 714.000000 684.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,684.000000) scale(0.100000,-0.100000)" fill="gold" stroke="none">
                            <path d="M3490 6331 c-20 -12 -54 -20 -81 -21 -31 0 -55 -7 -72 -20 -14 -11 -37 -20 -51 -20 -15 0 -31 -8 -38 -20 -7 -11 -23 -20 -35 -20 -13 0 -28 -9 -35 -20 -7 -11 -18 -20 -24 -20 -18 0 -134 -61 -134 -71 0 -5 -9 -9 -20 -9 -12 0 -31 -11 -44 -25 -13 -14 -32 -25 -43 -25 -11 0 -28 -9 -38 -20 -10 -11 -28 -20 -41 -20 -13 0 -28 -9 -34 -20 -6 -11 -19 -20 -29 -20 -10 0 -26 -9 -36 -20 -10 -11 -26 -20 -35 -20 -9 0 -27 -9 -40 -20 -13 -11 -31 -20 -40 -20 -9 0 -25 -9 -35 -20 -10 -11 -26 -22 -37 -26 -11 -3 -39 -19 -63 -35 -24 -16 -59 -36 -78 -44 -19 -8 -37 -21 -40 -30 -4 -8 -18 -15 -32 -15 -14 0 -30 -9 -37 -20 -7 -11 -23 -20 -35 -20 -13 0 -28 -9 -35 -20 -7 -11 -20 -20 -29 -20 -9 0 -26 -9 -39 -20 -13 -11 -31 -20 -41 -20 -11 0 -24 -9 -31 -20 -7 -11 -22 -20 -34 -20 -11 0 -29 -9 -38 -19 -10 -11 -31 -25 -47 -31 -16 -7 -29 -16 -29 -21 0 -5 -8 -9 -18 -9 -10 0 -29 -11 -42 -25 -13 -14 -31 -25 -40 -25 -9 0 -25 -9 -35 -20 -10 -11 -23 -20 -30 -20 -7 0 -22 -9 -35 -20 -13 -11 -28 -20 -35 -20 -7 0 -20 -9 -30 -20 -10 -11 -26 -20 -36 -20 -11 0 -24 -9 -31 -20 -7 -11 -21 -20 -30 -20 -10 0 -23 -9 -30 -20 -7 -11 -20 -20 -30 -20 -17 0 -38 -15 -118 -87 -26 -24 -52 -43 -58 -43 -7 0 -17 -9 -24 -20 -7 -11 -17 -20 -23 -20 -11 0 -155 -142 -155 -153 0 -3 -9 -17 -20 -29 -11 -13 -39 -44 -62 -71 l-41 -47 5 -1274 c4 -1129 6 -1277 20 -1298 10 -15 17 -54 19 -107 3 -64 8 -86 22 -95 9 -7 17 -23 17 -35 0 -37 50 -111 130 -193 70 -71 140 -128 159 -128 4 0 30 -20 57 -45 27 -24 56 -45 65 -45 9 0 24 -9 34 -20 10 -11 23 -20 29 -20 6 0 17 -9 24 -20 7 -11 22 -20 35 -20 12 0 28 -9 35 -20 7 -11 20 -20 30 -20 9 0 23 -9 30 -20 7 -11 22 -20 35 -20 12 0 28 -9 35 -20 7 -11 21 -20 32 -20 12 0 23 -7 27 -15 3 -9 19 -23 36 -32 17 -8 37 -22 45 -29 7 -8 21 -14 31 -14 10 0 26 -9 36 -20 10 -11 26 -20 37 -20 10 0 18 -5 18 -11 0 -5 15 -16 33 -24 19 -8 39 -21 47 -29 7 -9 22 -16 34 -16 12 0 27 -9 34 -20 7 -11 22 -20 35 -20 12 0 28 -9 35 -20 7 -11 20 -20 31 -20 10 0 26 -9 36 -20 10 -11 28 -20 41 -20 13 0 28 -9 34 -20 6 -11 23 -23 38 -26 15 -4 35 -15 45 -25 10 -11 24 -19 31 -19 7 0 23 -9 36 -20 13 -11 31 -20 42 -20 10 0 27 -9 38 -20 11 -11 28 -20 38 -20 9 0 23 -9 30 -20 7 -11 23 -20 37 -20 14 0 29 -8 35 -20 6 -11 21 -20 34 -20 13 0 31 -9 41 -20 10 -11 28 -20 40 -20 13 0 28 -7 35 -15 16 -19 116 -75 135 -75 8 0 24 -9 35 -20 11 -11 29 -20 40 -20 11 0 29 -9 40 -20 11 -11 32 -20 48 -20 16 0 32 -8 40 -20 10 -16 23 -20 63 -20 38 0 55 -5 65 -17 11 -16 35 -18 254 -18 219 0 243 2 254 18 10 12 27 17 65 17 40 0 53 4 63 20 9 14 24 20 50 20 27 0 41 6 50 20 7 11 24 20 37 20 14 0 41 10 60 23 59 37 74 46 109 61 18 8 35 22 38 31 3 8 16 15 29 15 12 0 30 9 40 20 10 11 29 20 41 20 13 0 29 9 36 20 7 11 22 20 34 20 11 0 29 9 39 20 10 11 26 20 35 20 9 0 27 9 40 20 13 11 29 20 36 20 8 0 19 9 26 20 7 11 20 20 28 20 9 0 31 11 50 25 19 14 41 25 50 25 8 0 23 9 33 20 9 11 23 20 30 20 8 0 22 9 32 20 10 11 26 20 36 20 11 0 24 9 31 20 7 11 23 20 35 20 13 0 28 9 35 20 7 11 23 20 36 20 12 0 30 9 39 20 10 11 23 20 29 20 6 0 21 9 34 20 13 11 31 20 41 20 11 0 24 9 31 20 7 11 22 20 34 20 12 0 28 7 35 17 8 9 29 22 47 30 18 7 35 20 39 28 3 8 16 15 29 15 13 0 29 9 36 20 7 11 23 20 35 20 13 0 28 9 35 20 7 11 20 20 29 20 9 0 24 9 34 20 10 11 24 20 31 20 8 0 19 9 26 20 8 12 24 20 40 20 17 0 33 8 40 20 7 11 18 20 25 20 6 0 18 8 25 19 7 10 24 22 38 26 14 4 32 14 40 21 59 53 88 77 110 89 26 14 80 70 115 119 11 16 30 41 43 56 12 15 22 34 22 42 0 8 9 23 20 33 12 11 20 31 20 49 0 17 8 43 18 56 16 24 17 100 17 1266 0 1132 -1 1244 -16 1260 -11 13 -18 46 -22 107 -3 61 -10 94 -21 106 -9 10 -16 34 -16 54 0 26 -6 41 -20 49 -11 7 -20 17 -20 22 0 5 -11 24 -25 42 -14 18 -25 36 -25 39 0 11 -54 65 -65 65 -6 0 -16 9 -23 20 -7 11 -19 20 -26 20 -8 0 -36 20 -62 45 -25 25 -56 45 -68 45 -12 0 -27 9 -34 20 -7 11 -18 20 -25 20 -7 0 -20 9 -30 20 -9 11 -27 20 -39 20 -13 0 -29 9 -36 20 -7 11 -18 20 -26 20 -7 0 -23 9 -36 20 -13 11 -30 20 -39 20 -9 0 -22 9 -29 20 -7 11 -22 20 -35 20 -12 0 -28 9 -35 20 -7 11 -19 20 -28 20 -9 0 -29 11 -46 25 -16 14 -35 25 -43 25 -7 0 -15 7 -19 15 -3 8 -14 15 -24 15 -10 0 -29 11 -42 25 -13 14 -31 25 -40 25 -9 0 -27 9 -40 20 -13 11 -29 20 -37 20 -7 0 -22 9 -33 20 -11 11 -28 20 -38 20 -9 0 -23 9 -30 20 -7 11 -23 20 -37 20 -14 0 -29 8 -35 20 -6 11 -19 20 -29 20 -10 0 -30 9 -43 20 -14 11 -36 24 -49 30 -40 18 -69 36 -93 59 -12 11 -33 21 -47 21 -13 0 -30 9 -37 20 -7 11 -22 20 -35 20 -12 0 -28 9 -35 20 -7 12 -23 20 -40 20 -16 0 -32 8 -40 20 -7 11 -22 20 -35 20 -12 0 -28 9 -35 20 -7 11 -20 20 -31 20 -10 0 -26 9 -36 20 -10 11 -28 20 -40 20 -12 0 -30 9 -40 20 -10 11 -24 20 -31 20 -7 0 -30 11 -50 25 -20 14 -46 25 -58 25 -12 0 -27 9 -34 20 -7 12 -23 20 -40 20 -16 0 -32 8 -40 20 -8 14 -23 20 -47 20 -22 0 -43 8 -55 20 -14 14 -33 20 -63 20 -31 0 -45 5 -55 20 -10 17 -23 20 -89 20 -53 0 -81 4 -93 15 -10 9 -47 17 -101 20 -72 5 -89 3 -119 -14z m-263 -1151 c18 -11 39 -34 48 -52 8 -18 26 -51 40 -73 29 -48 27 -43 53 -130 12 -38 27 -126 33 -195 6 -69 15 -163 19 -210 5 -47 9 -227 9 -400 1 -258 -3 -346 -19 -484 -12 -94 -26 -188 -31 -210 -6 -23 -15 -63 -21 -91 -5 -27 -14 -63 -20 -80 -6 -16 -14 -47 -19 -67 -5 -21 -14 -57 -20 -80 -6 -24 -15 -70 -20 -103 -6 -33 -15 -78 -20 -100 -6 -22 -14 -60 -19 -85 -12 -63 -12 -313 0 -346 17 -42 211 -234 238 -234 13 0 36 -10 51 -21 26 -19 39 -21 133 -17 66 3 116 10 141 21 20 9 52 23 70 31 59 25 143 112 179 184 l33 67 0 165 c0 113 -4 172 -12 187 -7 12 -17 54 -23 93 -6 39 -17 84 -25 100 -8 16 -15 43 -15 59 0 17 -8 52 -19 78 -10 26 -22 68 -26 93 -4 25 -13 56 -20 70 -7 14 -16 50 -20 80 -4 30 -13 80 -20 110 -8 30 -19 100 -25 155 -5 55 -15 127 -21 160 -14 77 -14 486 -1 545 6 25 16 88 22 140 6 52 18 120 27 150 69 248 121 367 188 428 24 23 51 42 58 42 26 0 95 -74 122 -130 15 -30 34 -68 42 -85 16 -29 49 -171 60 -251 3 -22 -3 -166 -12 -320 -9 -153 -18 -352 -18 -441 l-1 -161 37 -55 c21 -30 48 -58 60 -61 12 -3 80 -6 150 -6 122 0 129 1 152 24 13 13 29 43 35 67 16 57 9 275 -9 308 -8 14 -17 58 -22 99 -5 41 -15 96 -23 121 -8 26 -20 134 -27 251 -19 309 2 421 87 477 22 14 31 15 58 4 17 -7 56 -20 86 -28 30 -8 60 -19 67 -25 7 -5 27 -14 45 -18 45 -11 138 -51 168 -73 13 -9 32 -17 42 -17 9 0 19 -4 22 -9 3 -5 32 -24 64 -41 92 -52 213 -161 267 -239 47 -69 48 -72 67 -208 17 -121 20 -219 24 -788 6 -660 0 -868 -30 -1080 -21 -143 -38 -202 -79 -261 -35 -52 -211 -205 -262 -230 -16 -8 -79 -45 -140 -84 -60 -38 -130 -82 -155 -96 -25 -15 -64 -39 -87 -53 -22 -14 -71 -44 -108 -66 -37 -22 -72 -45 -79 -51 -6 -6 -23 -15 -36 -19 -14 -4 -38 -18 -55 -30 -16 -13 -66 -42 -110 -65 -44 -23 -87 -48 -95 -54 -8 -7 -26 -18 -40 -24 -14 -7 -61 -33 -105 -57 -136 -75 -362 -185 -382 -185 -10 0 -28 -7 -40 -15 -34 -24 -171 -50 -258 -49 -60 1 -98 8 -155 29 -91 33 -217 92 -225 105 -3 6 -14 10 -24 10 -9 0 -32 11 -51 25 -19 14 -40 25 -48 25 -8 0 -25 9 -39 20 -14 11 -33 20 -43 20 -9 0 -27 11 -40 25 -13 14 -28 25 -34 25 -16 0 -93 38 -201 100 -175 100 -376 210 -384 210 -4 0 -16 8 -27 18 -10 10 -57 40 -104 67 -162 93 -401 255 -463 314 -103 96 -138 197 -167 476 -5 44 -9 402 -9 795 -1 702 0 718 23 878 32 217 58 274 184 393 82 78 110 99 211 159 24 14 65 39 92 57 27 17 59 35 72 39 12 3 58 23 102 44 178 83 175 82 257 46 87 -39 137 -106 158 -213 13 -67 11 -114 -13 -263 -36 -224 -41 -260 -45 -345 -4 -105 18 -181 59 -202 35 -18 159 -17 186 2 67 47 80 141 58 430 -14 194 -10 375 11 485 15 78 90 202 157 263 37 32 51 33 94 7z"/>
                            </g>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="150pt" height="33pt" viewBox="0 0 910.000000 204.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,204.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M702 1823 c-54 -10 -53 10 -50 -777 3 -629 5 -728 18 -736 43 -27 186 -22 215 6 9 10 15 34 15 66 l0 50 55 -50 c90 -82 130 -97 265 -97 104 0 121 3 172 27 72 34 135 97 176 179 55 110 67 175 67 354 0 140 -3 169 -24 235 -12 41 -31 91 -41 111 -29 57 -105 128 -168 157 -51 24 -69 27 -162 27 -92 0 -112 -3 -160 -26 -30 -15 -73 -41 -95 -59 l-40 -32 -5 274 c-3 150 -7 274 -8 275 -19 18 -166 28 -230 16z m543 -707 c70 -46 110 -169 103 -316 -10 -184 -77 -280 -196 -280 -57 0 -116 33 -174 98 l-38 42 0 168 0 168 58 57 c33 32 76 65 98 73 47 17 114 13 149 -10z"/>
                            <path d="M4893 1823 c-55 -10 -53 11 -53 -763 0 -617 2 -718 15 -737 11 -16 30 -23 74 -28 73 -8 167 3 187 22 12 12 14 70 14 347 l0 333 53 50 c69 65 105 83 168 83 46 0 55 -4 89 -38 21 -21 43 -55 49 -77 7 -25 11 -158 11 -362 0 -269 2 -324 15 -336 29 -30 217 -33 253 -5 15 13 17 697 2 778 -24 126 -84 211 -185 261 -43 21 -64 24 -155 24 -99 0 -109 -2 -172 -33 -36 -19 -76 -45 -89 -58 -12 -13 -26 -24 -31 -24 -4 0 -8 118 -8 263 0 144 -4 268 -8 275 -17 27 -147 41 -229 25z"/>
                            <path d="M6110 1783 c-65 -21 -84 -55 -83 -149 1 -108 32 -134 159 -134 80 0 126 16 143 49 19 34 23 124 9 166 -18 54 -61 75 -148 74 -36 0 -72 -3 -80 -6z"/>
                            <path d="M7930 1362 c-174 -46 -294 -182 -336 -382 -22 -105 -14 -310 16 -400 71 -212 216 -300 496 -300 131 0 247 19 327 52 55 24 62 40 62 136 0 77 -17 96 -68 80 -119 -38 -172 -50 -249 -55 -186 -13 -283 50 -306 199 l-9 57 314 3 315 3 24 28 c21 25 24 37 24 115 -1 155 -36 262 -114 349 -105 117 -309 164 -496 115z m258 -219 c45 -37 69 -83 78 -150 l7 -53 -202 0 -201 0 0 29 c0 46 28 113 63 149 47 49 82 62 155 58 52 -3 70 -9 100 -33z"/>
                            <path d="M1872 1349 l-23 -9 3 -392 c4 -354 6 -398 23 -443 36 -97 85 -155 165 -196 36 -19 65 -24 145 -27 124 -5 178 13 281 92 l72 55 4 -56 c3 -31 11 -58 18 -63 42 -26 187 -21 215 7 22 21 22 989 1 1019 -12 16 -29 19 -113 22 -54 2 -110 -1 -125 -7 l-28 -11 0 -334 0 -335 -54 -56 c-117 -119 -230 -125 -294 -16 l-27 46 -3 340 c-3 407 9 375 -141 374 -53 0 -106 -4 -119 -10z"/>
                            <path d="M3039 1339 c-18 -18 -21 -30 -18 -98 6 -114 -1 -111 205 -111 96 0 174 -3 174 -6 0 -3 -86 -138 -191 -300 -105 -163 -195 -310 -200 -327 -19 -67 -6 -170 24 -189 7 -4 166 -8 354 -8 396 0 363 -10 363 113 0 119 4 116 -227 119 l-192 3 175 270 c226 349 217 331 218 433 1 129 21 122 -355 122 -301 0 -310 -1 -330 -21z"/>
                            <path d="M3929 1339 c-18 -18 -21 -30 -18 -98 6 -114 -1 -111 205 -111 96 0 174 -3 174 -6 0 -3 -86 -138 -191 -300 -105 -163 -195 -310 -200 -327 -19 -67 -6 -170 24 -189 7 -4 166 -8 354 -8 396 0 363 -10 363 113 0 119 4 116 -227 119 l-192 3 175 270 c226 349 217 331 218 433 1 129 21 122 -355 122 -301 0 -310 -1 -330 -21z"/>
                            <path d="M6077 1353 c-10 -2 -22 -16 -28 -29 -5 -15 -9 -228 -9 -502 0 -405 2 -481 15 -499 10 -15 30 -23 71 -28 71 -9 170 3 189 22 22 21 22 989 1 1019 -12 16 -28 19 -118 21 -57 1 -111 -1 -121 -4z"/>
                            <path d="M6518 1353 c-43 -11 -35 -45 131 -546 139 -416 166 -489 185 -497 77 -29 314 -22 346 10 18 18 316 906 327 974 9 55 -12 66 -125 66 -57 0 -107 -5 -121 -13 -22 -11 -38 -56 -135 -374 -61 -199 -114 -364 -117 -367 -3 -3 -56 157 -117 357 -82 267 -117 367 -133 380 -17 14 -40 17 -123 16 -55 -1 -109 -3 -118 -6z"/>
                            </g>
                            </svg>       
                        </a>
                    </div>
                    <div className="right-col">
                        <div className="p-refreshed_page__header_sidelink">New to buzzhive?<br />
                            <div target="_self" className="c-link bold" rel="noopener noreferrer">{this.props.navLink}</div>
                        </div>
                    </div>
                </header>
                <form onSubmit={this.handleSubmit} className="p-refreshed_page">
                    <h1 className="p-refreshed_page__heading">Sign in to buzzhive</h1>
                    <div className="p-refreshed_page__sub_heading">Continue with the Google account or username you use to sign in.</div>
                    <div className="p-get_started_signin">
                        <div className="p-google_form">
                            <button className="c-button c-button--primary c-button--large c-third_party_auth c-google_login full_width" id="google_login_button" data-qa="base_google_login_button" type="button">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="c-third_party_auth__icon">
                                <g>
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </g>
                            </svg>
                            <span className="c-google_login__label">Continue with Google</span>
                            </button>
                        </div>
                        <div className="c-horizontal_content_rule margin_bottom_150 margin_top_100">
                            <hr className="c-horizontal_content_rule__leftrule" />
                            <div className="c-horizontal_content_rule__content"><strong className="sk_light_gray_always">OR</strong></div>
                            <hr className="c-horizontal_content_rule__rightrule" />
                        </div>
                        {this.renderErrors()}
                        <div data-qa-formtext="true">
                            <div className="p-get_started_email_form">
                                {signupForm}
                                <label data-qa-formtext="true">
                                    <input 
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.update('username')}
                                        className="c-input_text c-input_text--large p-get_started_email_form__input" 
                                        id="username_field" 
                                        placeholder="Username"
                                    />
                                </label>
                                <label data-qa-formtext="true">
                                    <input 
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.update('password')}
                                        className="c-input_text c-input_text--large p-get_started_email_form__input"
                                        id="password_field"
                                        placeholder="Password"
                                    />
                                </label>
                            </div>
                            <input className="c-button c-button--outline c-button--large p-get_started_email_form__button p-get_started_aubergine_button" id="submit_btn" data-style="expand-right" data-qa="submit_button"  type="submit" value={this.props.formType} />
                        </div>
                    </div>
                    <div className="p-get_started_signin">
                        {demoLogin}
                        <div className="p-get_started_signin__manual"><i className="c-icon p-get_started_signin__icon c-icon--sparkles" type="sparkles" aria-hidden="true"></i><span className="padding_left_75">Don't feel like creating an account? Feel free to run a demo or go ahead and <a target="_self" className="c-link bold" rel="noopener noreferrer" href="/#/signup">sign up instead</a>.</span></div>
                    </div>
                </form>
                <footer className="p-refreshed_page__footer">
                    <a target="_blank" className="c-link c-button-unstyled p-refreshed_page__footer_link p-refreshed_page__footer_link--main" rel="noopener noreferrer">Privacy &amp; Terms</a>
                    <a target="_blank" className="c-link c-button-unstyled p-refreshed_page__footer_link p-refreshed_page__footer_link--main" rel="noopener noreferrer">Contact Us</a>
                    <div className="" aria-haspopup="true"><a target="_blank" className="c-link c-button-unstyled p-refreshed_page__footer_link p-refreshed_page__footer_link--main" rel="noopener noreferrer"><i className="c-icon margin_right_25 c-icon--globe c-icon--inherit" type="globe" aria-hidden="true"></i>Change region<i className="c-icon c-icon--chevron-medium-down c-icon--inherit" type="chevron-medium-down" aria-hidden="true"></i></a></div>
                </footer>
            </div>
        );
    }
}

export default SessionForm;
