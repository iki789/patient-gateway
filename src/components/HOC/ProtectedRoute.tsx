import React, { Component, PropsWithChildren, ComponentClass } from 'react'
import { Redirect, withRouter,  } from 'react-router-dom';
import { Auth } from '../../lib/auth';

// export default (ChildComponent: ComponentClass<RouteComponentProps & any>) =>{
//   class ProtectedRoute extends Component {
    
//     componentDidMount(){
//       if(!Auth.isLoggedIn){
//         console.log("gg")
//         return <Redirect to='/login' />
//       }
//     }
  
//     render() {
//       return (
//         <ChildComponent />
//       )
//     }
//   }
//   return ProtectedRoute;
// }

export default (component: Component<any & React.ComponentType<any>>) =>{
  if(!Auth.isLoggedIn){
    console.log("gg")
    console.log(component)   
  }
  return component;
}