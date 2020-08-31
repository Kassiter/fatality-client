import React from 'react';
import '../../stylesheets/individuals.css';
import axios from 'axios';
import IndividualsCard from './individualsCard';
import environment from '../../environment';
import RouletteCard from './rouletteCard';

interface Props{}

interface State{
  personal_features: Array<any>
}

class Individuals extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      personal_features: [],
    };
  }

  componentDidMount() {
    axios.get(`${environment.backend_url}/personal_features`)
      .then((res) => {
        this.setState({ personal_features: res.data });
      });
  }

  renderPersonalFeatures = () => {
    const result: Array<JSX.Element> = [];
    this.state.personal_features.forEach((feature) => {
      result.push(<IndividualsCard
        name={feature.name}
        tooltip={feature.tooltip}
        login_locked={feature.login_locked}
        tooltipPlacement={feature.name == 'Personal trail' ? 'left' : 'right'}
        background="personal-skin"
        img_url={feature.img_url}
        option_basic_link={feature.option_basic_link}
        option_advanced_link={feature.option_advanced_link}
        discount={feature.discount}
        option_basic_cost={this.countDiscount(feature.option_basic_cost, feature.discount)}
        option_advanced_cost={this.countDiscount(feature.option_advanced_cost, feature.discount)}
        option_basic_name={feature.option_name_basic}
        option_advanced_name={feature.option_name_advanced}
      />);
    });
    return result;
  }

  countDiscount = (price: number, discount: number): number => {
    return (discount != undefined && discount != null && discount > 0) ? price - (price * (discount / 100)) : price
  }

  render() {
    return (
      <div className="individuals-section__container">
        <h1>персональные товары</h1>
        <div className="individuals-section__cards-container">
          {this.renderPersonalFeatures()}
          <RouletteCard />
        </div>
      </div>
    );
  }
}

export default Individuals;
