import * as types from './types';

const mutations = {
  [types.ADD_TO_COMPONENT_MAP]: (state, payload) => {
    const { componentName, htmlList, children, isActive } = payload;
    state.componentMap = {
      ...state.componentMap,
      [componentName]: {
        componentName,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        children,
        htmlList,
        isActive
      }
    };
  },
  [types.UPDATE_CHILDREN]: function(state, payload) {
    const { name, newArray } = payload;
    state.componentMap[name].children = newArray;
  },
  [types.ADD_TO_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList.push({ text: payload, children: [] });
  },
  [types.SET_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList = payload;
  },
  [types.SET_CLICKED_COMPONENT]: (state, payload) => {
    state.clickedComponent = payload;
  },
  [types.ADD_TO_COMPONENT_HTML_LIST]: (state, elementName) => {
    const componentName = state.activeComponent;
    state.componentMap[componentName].htmlList.push({
      text: elementName,
      children: []
    });
  },
  [types.SET_CLICKED_ELEMENT_LIST]: (state, payload) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList = payload;
  },
  [types.DELETE_ACTIVE_COMPONENT]: state => {
    const { componentMap, activeComponent } = state;

    let newObj = Object.assign({}, componentMap);

    delete newObj[activeComponent];

    console.log(componentMap);
    for (let compKey in newObj) {
      let children = newObj[compKey].children;
      children.forEach((child, index) => {
        if (activeComponent === child) children.splice(index, 1);
      });
    }
    state.componentMap = newObj;
  },
  [types.SET_COMPONENT_MAP]: (state, payload) => {
    console.log(payload);
    state.componentMap = payload;
  },
  [types.DELETE_SELECTED_ELEMENT]: (state, payload) => {
    state.selectedElementList.splice(payload, 1);
  },
  [types.SET_STATE]: (state, payload) => {
    console.log('SETTING STATE');
    console.log(payload);
    Object.assign(state, payload);
  },
  [types.ADD_PROJECT]: (state, payload) => {
    console.log('PUSHING ', payload);
    state.projects.push(payload);
    state.projectNumber++;
  },
  [types.CHANGE_ACTIVE_TAB]: (state, payload) => {
    state.activeTab = payload;
  },
  [types.ADD_ROUTE]: (state, payload) => {
    state.routes = {
      ...state.routes,
      [payload]: []
    };
  },
  [types.ADD_ROUTE_TO_COMPONENT_MAP]: (state, payload) => {
    const { componentName, children } = payload;
    state.componentMap = {
      ...state.componentMap,
      [componentName]: {
        componentName,
        children
      }
    };
  },
  [types.SET_ACTIVE_ROUTE]: (state, payload) => {
    state.activeRoute = payload;
  },
  [types.ADD_COMPONENT_TO_ACTIVE_ROUTE]: (state, payload) => {
    state.routes[state.activeRoute].push(payload);
  },
  [types.SET_ACTIVE_COMPONENT]: (state, payload) => {
    state.activeComponent = payload;
  },
  [types.SET_ROUTES]: (state, payload) => {
    state.routes = Object.assign({}, payload);
  },
  [types.SET_ACTIVE_ROUTE_ARRAY]: (state, payload) => {
    state.routes[state.activeRoute] = payload;
  },
  [types.ADD_TO_ROUTE_CHILDREN]: (state, payload) => {
    state.componentMap[state.activeRoute].children.push(payload);
  },
  [types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE]: (state, payload) => {
    state.componentChildrenMultiselectValue = payload;
  }
};

export default mutations;
