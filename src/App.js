import React from 'react'
import './index.css'
import Navbar from './component/landingpage/Navbar'
import ProductContain from './component/landingpage/ProductContain'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './component/checkout/Checkout'
import SignUp from './component/auth/SignUp'
import Login from './component/auth/Login'
import Profile from './component/user/Profile'
import { AuthProvider } from './context/AuthContext'
import { FireStoreProvider } from './context/FirestoreContext'
import { StoreProvider } from './context/StoreContext'
import ChangePassEmail from './component/user/ChangePassEmail'
import UpdateProfile from './component/user/UpdateProfile'
import PrivateRoutes from './PrivateRoutes'
import Dashboard from './component/dashboard/Dashboard'
import SetStore from './component/user/SetStore'
import Addproduct from './component/product/Addproduct'
import RentForm from './component/payment/RentForm'
import PaymentProof from './component/payment/PaymentProof'
import UpdateProduct from './component/product/UpdateProduct'
import DashboardContent from './component/dashboard/DashboardContent'
import ListProduct from './component/dashboard/ListProduct'
import ListTransactionPayment from './component/dashboard/ListTransactionPayment'
import ListRentTransaction from './component/dashboard/ListRentTransaction'
import ListReturnTransaction from './component/dashboard/ListReturnTransaction'
import ViewDetailTransaction from './component/dashboard/ViewDetailTransaction'



function App() {

  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <FireStoreProvider>
            <StoreProvider>
              <Switch>
                <Dashboard path="/dashboard/returnlist" component={ListReturnTransaction} />
                <Dashboard path="/dashboard/rentlist" component={ListRentTransaction} />
                <Dashboard path="/dashboard/paymentlist" component={ListTransactionPayment} />
                <Dashboard path="/dashboard/productlist" component={ListProduct} />
                <Dashboard path="/dashboard/view-product/:id" component={UpdateProduct} />
                <Dashboard path="/dashboard/view-detailtransaction/:id" component={ViewDetailTransaction} />
                <Dashboard path="/dashboard/returnlist/view-detailtransaction/:id" component={ViewDetailTransaction} />
                <Dashboard path="/dashboard/" component={DashboardContent} />
                <PrivateRoutes path="/profile" component={Profile} />
                <PrivateRoutes path="/changepassemail" component={ChangePassEmail} />
                <PrivateRoutes path="/updateprofile" component={UpdateProfile} />
                <PrivateRoutes path="/setstore" component={SetStore} />
                <PrivateRoutes path="/rentform" component={RentForm} />
                <PrivateRoutes path="/paymentproof/:id" component={PaymentProof} />
                <Route path="/checkout">
                  <Navbar />
                  <Checkout />
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/addproduct">
                  <Addproduct />
                </Route>
                <Route exact path="/" >
                  <Navbar />
                  <ProductContain />
                </Route>
              </Switch>
            </StoreProvider>
          </FireStoreProvider>
        </AuthProvider>
      </div>
    </Router>

  );
}

export default App;
