import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
interface props {
  onChange?: ((value: string) => void) | undefined
  value:string
}
class SketchExample extends React.Component<props> {
  constructor(props: any) {
    super(props)
  }
  state = {
    displayColorPicker: false,
    color: this.props.value,
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color: any) => {
    this.props.onChange && this.props.onChange(color.hex)
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${this.props.value}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
          left: '20px'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        { this.state.displayColorPicker ? <div style={styles.popover as any}>
          <div style={styles.cover as any} onClick={this.handleClose} />
          <SketchPicker color={this.props.value as any} onChange={this.handleChange} />
        </div> : null}

      </div>
    )
  }
}

export default SketchExample