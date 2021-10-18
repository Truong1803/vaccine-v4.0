import React from 'react';

import { useSelector } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import LookUpUser from '../../Components/LookUp/LookUp';
import ListOrganizationInjection
  from '../../Components/ManageinjectionPlan/ListOrganization';
import ListPlan from '../../Components/ManageinjectionPlan/ListPlan';
import ListUserInjection from '../../Components/ManageinjectionPlan/ListUser';
import List from '../../Components/ManageUser/List';
import ListOrganization from '../../Components/ManageUser/ListOrganization';
import ListUser from '../../Components/ManageUser/ListUser';
import RegisterInjectionOrganization
  from '../../Components/RegisterInjection/RegisterInjectionOrganization';
import RegisterInjectionUser
  from '../../Components/RegisterInjection/RegisterInjectionUser';
import Certificate from './Certificate';
import Dashboard from './Dashboard';
import DepartmentHealth from './DepartmentHealth';
import HealthRecord from './HealthRecord';
import Home from './Home';
import Info from './Info';
import InjectionUnit from './InjectionUnit';
import ManageRole from './ManageRole';
import ManageVaccine from './ManageVaccine';
import PostHealthRecord from './PostHealthRecord';
import PreHealthRecord from './PreHealthRecord';
import Profile from './Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Content() {
  const { auth } = useSelector((state) => state);
  return (
    <Switch>
      <Route path="/sign_in">
        {auth.user?._id ? <Redirect to="/" /> : <SignIn />}
      </Route>
      <Route path="/sign_up">
        {auth == "pending" ? <Redirect to="/profile" /> : <SignUp />}
      </Route>
      <Route path="/profile">
        {auth.user?._id ? <Redirect to="/" /> : <Profile />}
      </Route>
      <Route path="/info">
        <Info />
      </Route>
      <Route path="/register_injection_user">
        <RegisterInjectionUser />
      </Route>
      <Route path="/register_injection_organization">
        <RegisterInjectionOrganization />
      </Route>
      <Route path="/look_up">
        <LookUpUser />
      </Route>
      <Route path="/certificate">
        <Certificate />
      </Route>
      <Route path="/admin/health-record">
        <HealthRecord />
      </Route>
      <Route path="/admin/pre-health_record">
        <PreHealthRecord />
      </Route>
      <Route path="/admin/post-health_record">
        <PostHealthRecord />
      </Route>
      <Route path="/admin/dashboard">
        <Dashboard />
      </Route>
      <Route path="/admin/list_user_injection">
        <ListUserInjection />
      </Route>
      <Route path="/admin/list_plan_injection">
        <ListPlan />
      </Route>
      <Route path="/admin/list_organization_injection">
        <ListOrganizationInjection />
      </Route>
      <Route path="/admin/manage_vaccine">
        <ManageVaccine />
      </Route>
      <Route path="/admin/manage_role">
        <ManageRole />
      </Route>
      <Route path="/admin/injection_unit">
        <InjectionUnit />
      </Route>
      <Route path="/admin/department_health">
        <DepartmentHealth />
      </Route>
      {/* <Route path="/admin/manage_user">
        <DepartmentHealth />
      </Route> */}
      <Route path="/admin/canhan">
        <ListUser />
      </Route>
      <Route path="/admin/tochuc">
        <ListOrganization />
      </Route>
      <Route path="/admin/tochuc2">
        <List />
      </Route>
      <Route exact path="/:page/:slug">
        <Home />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default Content;
