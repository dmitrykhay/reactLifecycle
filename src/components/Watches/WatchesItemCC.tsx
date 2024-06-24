import React from "react";
import "./watches.css";

interface WatchesItemCCProps {
  title: string;
  zone: string;
}

export class WatchesItemCC extends React.Component<WatchesItemCCProps, {
  secondHand: HTMLElement | null;
  minuteHand: HTMLElement | null;
  hourHand: HTMLElement | null;
}> {
  timeout: any;
  constructor(props: WatchesItemCCProps) {
    super(props);

    this.state = {
      secondHand: null,
      minuteHand: null,
      hourHand: null,
    };

    this.timeout;
  }

  componentDidMount() {
    console.log("добавлено");
    
    this.setState({
      secondHand: document.querySelector('.second-hand'),
      minuteHand: document.querySelector('.minute-hand'),
      hourHand: document.querySelector('.hour-hand'),
    });
    this.updateClock();
  }

  componentDidUpdate(_oldProps: any, _oldState: any) {
    console.log("обновлено");

  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
    console.log("удалено");
    
  }

  updateClock = () => {
    setTimeout(() => {
      const { secondHand, minuteHand, hourHand } = this.state;
      if (secondHand && minuteHand && hourHand) {
        const now = new Date();
        const seconds = now.getUTCSeconds();
        const minutes = now.getUTCMinutes();
        const hours = now.getUTCHours() + Number(this.props.zone);
        secondHand.style.transform = `rotate(${seconds * 6}deg)`;
        minuteHand.style.transform = `rotate(${minutes * 6 + seconds / 10}deg)`;
        hourHand.style.transform = `rotate(${hours * 30 + minutes / 2}deg)`;
      }
    
      this.timeout = window.setTimeout(this.updateClock, 1000);
    }, 0);
  }
  
  handleClickDelete = (e: React.PointerEvent<HTMLButtonElement>) => {
    console.log('Delete', e);
    
    
    const itemElement = (e.target as HTMLButtonElement).closest('.watches-item');
    if (itemElement) {
      itemElement.remove();     
    }
    window.clearTimeout(this.timeout);
  }

  render() {

    return (
      <div className="watches-item">
        <span className="watches-item-span">{this.props.title}</span>
        <button className="watches-item-btn" type="button" onClick={this.handleClickDelete}>X</button>
        <div className="clock">
          <div className="hour-hand"></div>
          <div className="minute-hand"></div>
          <div className="second-hand"></div>
        </div>
      </div>    
    )
  }
}
