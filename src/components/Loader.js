import React, {Component, Suspense, lazy} from 'react';
import PropTypes from 'prop-types';
import NoMatch from '@views/Error/NoMatch';

export default class Loader extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      newPath: this.props.path,
      instance: null,
      noFound: false,
      loadError: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.path !== state.newPath) {
      return {
        newPath: props.path
      };
    }
    return null;
  }

  componentDidMount() {
    this.loadComponent(this.props.path);
  }

  // componentWillReceiveProps(nextProp) {
  //   if (this.props.path !== nextProp.path) {
  //     this.setState({
  //       instance: null,
  //       noFound: false,
  //       loadError: ''
  //     }, () => {
  //       this.loadComponent(nextProp.path);
  //     });
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    console.log("newPath:", this.props, prevState);
    if (prevState.newPath !== this.state.newPath) {
      this.loadComponent(this.state.newPath);
    }
  }

  loadComponent(path) {
    let filePath = this.parseUrl(path);
    
    // this.setState({
    //   instance: lazy(() => import(filePath))
    // });

    this.props.import(filePath).then(component => {
      if (typeof component === 'string') {
        this.setState({
          noFound: true,
          loadError: component
        });
      } else {
        this.setState({
          instance: (<component/>)
        });
      }
    });
  }

  //解析url
  parseUrl(path) {
    let arr = path.split('/');
    console.log("url_arr:", arr);
    arr.shift();
    console.log("url_arr:", arr);
    let module = arr.pop();
    console.log("url_arr:", arr, module);
    if (module === '') {
      module = 'Index';
    } else {
      module = this.under2hump(module);
    }
    let extPath = arr.length > 0 ? '@' : '';
    console.log("url_arr:", extPath + arr.join('/') + '/' + module);
    return extPath + arr.join('/') + '/' + module;
  }

  ucFirst(str) {
    let first = str[0].toUpperCase();
    return first + str.substr(1);
  }

  under2hump(str) {
    let arr = str.split('_');
    console.log("under_arr:", arr);
    let hump = arr.map((item) => {
      return this.ucFirst(item);
    });
    return hump.join('');
  }


  renderComponent() {
    let Instance = this.state.instance;
    return <Instance {...this.props}/>;
  }

  render() {
    if (this.state.instance) {
      return this.renderComponent();
    } else {
      return (
        <div>
          {this.state.noFound ? (
            <div>
              <NoMatch/>
              <br/>{this.state.loadError}</div>) : <div>模块加载中</div>}
        </div>
      );
    }
  }
}

Loader.defaultProps = {
  path: '',
  import: () => {
  }
};

Loader.propTypes = {
  path: PropTypes.string,
  import: PropTypes.func
};