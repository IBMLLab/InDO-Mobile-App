import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";



import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as UserInputProvider } from "./src/context/UserInputContext";
import { Provider as FitbitUserProvider} from "./src/context/FitbitUserContext";

import StartScreen from "./src/screens/StartingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import UserInputScreen from "./src/screens/UserInputScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import SosScreen from "./src/screens/SosScreen";
import FitbitScreen from "./src/screens/FitbitScreen";
import GoogleFitScreen from "./src/screens/GoogleFitScreen";
import { setNavigator } from "./src/navigationRef";
import LoadingScreen from "./src/screens/LoadingScreen";
import UserProfileEditScreen from "./src/screens/UserProfileEditScreen";
import AddSosContactScreen from "./src/screens/AddSosContactScreen";
import ForgetPasswordScreen from "./src/screens/ForgetPasswordScreen";
import OtpVerificationScreen from "./src/screens/OtpVerificationScreen";
import NewPasswordScreen from "./src/screens/NewPasswordScreen";
import FitbitUserProfileScreen from "./src/screens/FitbitUserProfileScreen";

const switchNavigator = createSwitchNavigator({
      Loading:LoadingScreen,
      loginFlow:createStackNavigator({
        'Start':StartScreen,
        'Login':LoginScreen,
        forgotPassword:ForgetPasswordScreen,
        otpVerification:OtpVerificationScreen,
        NewPassword:NewPasswordScreen,
      },{
        defaultNavigationOptions:{
          title:'InDo App'
        }
      }),
      mainFlow:createMaterialTopTabNavigator({
        Status:HistoryScreen,
        UserInput:UserInputScreen,
        Settings:createStackNavigator({
              UserProfile:{
                screen:UserProfileScreen,
                navigationOptions:{
                  title:'User Profile'
                }
              },
              UserProfileEdit:{
                screen:UserProfileEditScreen,
                navigationOptions:{
                  title:'Profile Edit'
                }
              },
              Fitbit:FitbitScreen,
              FitbitUserProfile:{
                screen:FitbitUserProfileScreen,
                navigationOptions:  {
                  title: 'Fitbit User Profile',
                  headerLeft: ()=> null,
              }
              }, 
              GoogleFit:GoogleFitScreen,
        }),
        Sos:createStackNavigator({
          SOS:SosScreen,
          SOSContactAdd:{
            screen:AddSosContactScreen,
            navigationOptions:{
              title:'Add SOS Contact'
            }
          },

        })
      },{
        tabBarOptions: {
          labelStyle: {
            fontSize:12,
          },
          tabStyle: {
            height:80,
            paddingTop:30,

          },
          style: {
            backgroundColor:'#6C63FF',   
            borderColor: 'white', 
          },
        }
      })
},{
  initialRouteName : 'Loading',
});


// const navigator = createStackNavigator({
//     'Start':StartScreen,
//     'Login':LoginScreen,
//     'History':HistoryScreen,
// },{
//   initialRouteName : 'Start',
//   defaultNavigationOptions:{
//     title:'InDo App'
//   }
// });


const App = createAppContainer(switchNavigator);


export default () => {
  return (
    
    <AuthProvider>
      <UserInputProvider>
        <FitbitUserProvider>
      <App ref={(navigator) =>{setNavigator(navigator)}}/>
      </FitbitUserProvider>
      </UserInputProvider>
    </AuthProvider>
  )
};