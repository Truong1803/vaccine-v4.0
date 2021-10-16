import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import DepartmentHealth from "./DepartmentHealth";
import InjectionUnit from "./InjectionUnit";
import ManageRole from "./ManageRole";
import ManageVaccine from "./ManageVaccine";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ManageUser from "./ManageUser";
import Profile from "./Profile";
import ListUser from "../../Components/ManageUser/ListUser";
import ListOrganization from "../../Components/ManageUser/ListOrganization";
import Home from "./Home";
import { useSelector } from "react-redux";
import RegisterInjectionUser from "../../Components/RegisterInjection/RegisterInjectionUser";
import RegisterInjectionOrganization from "../../Components/RegisterInjection/RegisterInjectionOrganization";
import List from "../../Components/ManageUser/List";
import LookUpUser from "../../Components/LookUp/LookUp";
import ListUserInjection from "../../Components/ManageinjectionPlan/ListUser";
import ListOrganizationInjection from "../../Components/ManageinjectionPlan/ListOrganization";
import Info from "./Info";
import HealthRecord from "./HealthRecord";
import ListPlan from "../../Components/ManageinjectionPlan/ListPlan";
function Content() {
  const { auth } = useSelector((state) => state);
  return (
    <Switch>
      <Route path='/sign_in'>
        {auth.user?._id ? <Redirect to='/' /> : <SignIn />}
      </Route>
      <Route path='/sign_up'>
        {auth == "pending" ? <Redirect to='/profile' /> : <SignUp />}
      </Route>
      <Route path='/profile'>
        {auth.user?._id ? <Redirect to='/' /> : <Profile />}
      </Route>
      <Route path='/info'>
        <Info />
      </Route>
      <Route path='/register_injection_user'>
        <RegisterInjectionUser />
      </Route>
      <Route path='/register_injection_organization'>
        <RegisterInjectionOrganization />
      </Route>
      <Route path='/look_up'>
        <LookUpUser />
      </Route>
      <Route path='/admin/health_record'>
        <HealthRecord />
      </Route>
      <Route path='/admin/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/admin/list_user_injection'>
        <ListUserInjection />
      </Route>
      <Route path='/admin/list_plan_injection'>
        <ListPlan />
      </Route>
      <Route path='/admin/list_organization_injection'>
        <ListOrganizationInjection />
      </Route>
      <Route path='/admin/manage_vaccine'>
        <ManageVaccine />
      </Route>
      <Route path='/admin/manage_role'>
        <ManageRole />
      </Route>
      <Route path='/admin/injection_unit'>
        <InjectionUnit />
      </Route>
      <Route path='/admin/department_health'>
        <DepartmentHealth />
      </Route>
      {/* <Route path="/admin/manage_user">
        <DepartmentHealth />
      </Route> */}
      <Route path='/admin/canhan'>
        <ListUser />
      </Route>
      <Route path='/admin/tochuc'>
        <ListOrganization />
      </Route>
      <Route path='/admin/tochuc2'>
        <List />
      </Route>
      <Route exact path='/:page/:slug'>
        <Home />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
    </Switch>
  );
}

export default Content;
