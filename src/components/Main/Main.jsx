import React, {Component} from 'react';
import anime from 'animejs';
import IconButton from 'material-ui/IconButton';
import * as styles from './styles.css';

export default class Main extends Component {
  componentDidMount() {
    anime({
      targets: '#text',
      translateY: ['12rem', '0rem'],
      delay: 520,
      easing: 'easeOutExpo',
      duration: 2200,
      opacity: [0, 1],
    });

    anime({
      targets: '#icon-github',
      translateY: ['10rem', '0rem'],
      delay: 600,
      easing: 'easeOutExpo',
      duration: 2400,
      opacity: [0, 1],
    });

    anime({
      targets: '#icon-twitter',
      translateY: ['10rem', '0rem'],
      delay: 600,
      easing: 'easeOutExpo',
      duration: 2400,
      opacity: [0, 1],
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div id="text" className={styles.text}>Prevl IO</div>
          <div className={styles.iconContainer}>
            <a id="icon-twitter" href="https://twitter.com/preco21_">
              <IconButton
                style={{width: '6rem', height: '6rem'}}
                iconClassName="fa fa-twitter"
                iconStyle={{fontSize: '4rem', color: 'white'}}
              />
            </a>
            <a id="icon-github" href="https://github.com/preco21">
              <IconButton
                style={{width: '6rem', height: '6rem'}}
                iconClassName="fa fa-github"
                iconStyle={{fontSize: '4rem', color: 'white'}}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
