import { login, register } from "../../api/user";
import { getJournals } from '../../api/journal'
import { store } from '../../store'
import { loadRoute } from '../../actions'
import { setToken, setEmail, setJournal } from '../../utils/localStorage'
import getHeader from '../../utils/header'
export class LoginPage extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = (`
        <style>
        body{
            display: block;
            color: #c0c0c0;
            background-color: #F0D6C7;
            font:600 16px/18px 'Open Sans',sans-serif;
        }
        *,:after,:before{box-sizing:border-box}
        .clearfix:after,.clearfix:before{content:'';display:table}
        .clearfix:after{clear:both;display:block}
        a{color:inherit;text-decoration:none}
        
        h1 {
            color:#fff;
            margin-top: -60px;
            margin-bottom: 120px;
            font-size: 30px;
            user-select: none;
            text-align: center;
            text-shadow: 1px 1px #747c71;
        }
        
        .login-wrap{
            width:100%;
            margin: 20em auto;
            max-width:525px;
            min-height:670px;
            position:relative;
            background:url(https://live.staticflickr.com/7177/13535412304_8571d152b8_b.jpg) no-repeat center;
            box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
            border-radius: 1em;
        }
        .login-html{
            width:100%;
            height:100%;
            position:absolute;
            padding:90px 70px 50px 70px;
            background:rgba(201,203,179,0.7);
            border-radius: 1em;
        }
        .login-html .sign-in-htm,
        .login-html .sign-up-htm{
            top:0;
            left:0;
            right:0;
            bottom:0;
            position:absolute;
            transform:rotateY(180deg);
            backface-visibility:hidden;
            transition:all .4s linear;
        }
        .login-html .sign-in,
        .login-html .sign-up,
        .login-form .group .check{
            display:none;
        }
        .login-html .tab,
        .login-form .group .label,
        .login-form .group .button{
            text-transform:uppercase;
            user-select: none;
        }
        .login-html .tab{
            font-size:22px;
            margin-right:15px;
            padding-bottom: 15px;
            margin:0 15px 10px 0;
            display:inline-block;
            border-bottom:2px solid transparent;
            text-shadow: 1px 1px #747c71;
        }
        .login-html .sign-in:checked + .tab,
        .login-html .sign-up:checked + .tab{
            color:#fff;
            border-color:rgba(255,255,255,0.75);
        }
        .login-form{
            min-height:345px;
            position:relative;
            perspective:1000px;
            transform-style:preserve-3d;
        }
        .login-form .group{
            margin-bottom:15px;
        }
        .login-form .group .label,
        .login-form .group .input,
        .login-form .group .button{
            width:100%;
            color:#fff;
            display:block;
            text-shadow: 1px 1px #747c71;
        }
        .login-form .group .input,
        .login-form .group .button{
            border:none;
            padding:15px 20px;
            border-radius:25px;
            background:rgba(218,212,196,.8);
        }
        .login-form .group input[data-type="password"]{
            text-security:circle;
            -webkit-text-security:circle;
        }
        .login-form .group .label{
            color:#fff;
            font-size:12px;
        }
        .login-form .group .button{
            margin-top: 3em;
            background: #d9dbca;
            color: #444C57;
        }
        
        .login-form .group .button:active{
            background: #ABB696;
            color: #444C57;
            box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
        
        }
        
        .login-form .group label .icon{
            width:15px;
            height:15px;
            border-radius:2px;
            position:relative;
            display:inline-block;
            background:rgba(192,192,192,.1);
        }
        .login-form .group label .icon:before,
        .login-form .group label .icon:after{
            content:'';
            width:10px;
            height:2px;
            background:#fff;
            position:absolute;
            transition:all .2s ease-in-out 0s;
        }
        .login-form .group label .icon:before{
            left:3px;
            width:5px;
            bottom:6px;
            transform:scale(0) rotate(0);
        }
        .login-form .group label .icon:after{
            top:6px;
            right:0;
            transform:scale(0) rotate(0);
        }
        .login-form .group .check:checked + label{
            color:#fff;
        }
        .login-form .group .check:checked + label .icon{
            background:blue;
        }
        .login-form .group .check:checked + label .icon:before{
            transform:scale(1) rotate(45deg);
        }
        .login-form .group .check:checked + label .icon:after{
            transform:scale(1) rotate(-45deg);
        }
        .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
            transform:rotate(0);
        }
        .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
            transform:rotate(0);
        }
        
        .hr{
            height:2px;
            margin:60px 0 50px 0;
            background:rgba(192,192,192,0.8);
        }
        .foot-lnk{
            text-align:center;
            color:#fff;
        }
        </style>

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>23am Bullet Journal - Home</title>
                <meta name="description" content="">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <!-- Log-in Page Script Functions-->
                <script src="/source/frontend/src/js/components/login.js"></script>
                <script src="/source/frontend/src/js/api/user.js"></script>
                <script src="/source/frontend/src/js/scripts/loginPageScripts.js"></script>
            </head>
        
            <!-- Start of Log In Page HTML-->
            <div class="login-wrap">
                <div class="login-html">
                    <h1>📝 Bullet Journal 📝</h1>
                    <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
                    <div class="login-form">
        
                        <!-- Start of Sign In Form-->
                        <div class="sign-in-htm">
                            <div class="group">
                                <label for="user" class="label">Email Address</label>
                                <input id="username-input" type="text" class="input">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input id="password-input" type="password" class="input" data-type="password">
                            </div>
                            <div class="group">
                                <button id="signin-button" type="submit" class="button">Sign In</button>
                            </div>
                            <div class="hr"></div>
                        </div>
                        
                        <!-- Start of Sign Up Form-->
                        <div class="sign-up-htm">
                            <div class="group">
                                <label for="user" class="label">Email Address</label>
                                <input id="username-signup-input" type="text" class="input">
                            </div>
                            <div class="group">
                                <label for="pass" class="label">Password</label>
                                <input id="password-signup-input" type="password" class="input" data-type="password">
                            </div>
                            <div class="group">
                                <label for="passconfirm" class="label">Confirm Password</label>
                                <input id="password-signup-confirm" type="password" class="input" data-type="password">
                            </div>
                            <div class="group">
                                <button id="signup-button" type="submit" class="button">Sign Up</button>
                            </div>
                            <div class="hr"></div>
                            <div class="foot-lnk">
                                <label for="tab-1">Already have an account?</a>
                            </div>
                            <!-- End of Sign Up Form-->
                        </div>
                    </div>
                </div>
            </div>
            <script src="/source/frontend/src/js/components/login.js"></script>
            `)
    }
}


/**
 * Function waits for DOM to load before fetching components
 */
window.onload = function () {
    var signinbutton = document.getElementById('signin-button');
    var signupbutton = document.getElementById('signup-button');
    if (signinbutton && signupbutton) {
        signinbutton.addEventListener('click', signinFunction);
        signupbutton.addEventListener('click', signupFunction);
    }
}


/**
 * Function that triggers when Sign In button is clicked
 */
function signinFunction() {
    var username = document.getElementById('username-input').value;
    var password = document.getElementById('password-input').value;
    signIn(username, password)
}


/**
 * Function that triggers when Sign Up button is clicked
 */
function signupFunction() {
    var username = document.getElementById('username-signup-input').value;
    var password = document.getElementById('password-signup-input').value;
    var confirmpassword = document.getElementById('password-signup-confirm').value;

    if (password == confirmpassword) {
        register(username, password)
            .then(() => {
                signIn(username, password)
            });
    }
    else {
        window.alert("Passwords do not match");
    }
}

function signIn(username, password) {
    login(username, password)
        .then(token => {
            setEmail(username);
            setToken(token)
            getJournals(getHeader()).then((value) => {
                setJournal(value[0].id);
                store.dispatch(loadRoute({ path: 'daily' }))
            });
        })
        .catch(err => {
            window.alert(err)
        })
}

customElements.define('login-page', LoginPage);