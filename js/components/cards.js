import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, TouchableHighlight } from "react-native"
import { RegularText, BoldText } from "./styledText"
import ReadMore from "./readMore"
import Styles, { Color } from "../styles"

export class Card extends Component {

  static propTypes = {
    title: PropTypes.string,
    grouped: PropTypes.bool
  }

  static defaultProps = {
    title: null,
    grouped: false
  }

  setNativeProps(props) {
    this.refs["card"].setNativeProps(props);
  }

  render() {
    let header = null;
    if (this.props.title) {
        header = (<View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            {this.props.title}
          </BoldText>
        </View>)
    }
    let border = <View style={styles.cardBorder} />;
    let topBorder = border;
    let bottomBorder = this.props.grouped ? null : border;
    return (
      <View ref={"card"}>
        {header}
        {topBorder}
        <View style={styles.card}>
          <View style={styles.cardBody}>
            {this.props.children}
          </View>
        </View>
        {bottomBorder}
      </View>
    );
  }
}

export class CardGutter extends Component {

  static propTypes = {
    height: PropTypes.number
  }

  static defaultProps = {
    height: 15
  }

  render() {
    return (
      <View style={{height:this.props.height}}>
      </View>
    );
  }
}

export class TouchableCard extends Component {

  static propTypes = {
    ...Card.propTypes,
    onPress: PropTypes.func
  }

  static defaultProps = {
    ...Card.defaultProps,
    onPress: () => {}
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Card {...this.props}>
          {this.props.children}
        </Card>
      </TouchableHighlight>
    );
  }
}

export class MemoCard extends Component {
  render() {
    let { text } = this.props;
    return (
      <View>
        <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            Description
          </BoldText>
        </View>

        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={6}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <RegularText style={styles.cardText}>
                {text}
              </RegularText>
            </ReadMore>
          </View>
        </View>
      </View>
    );
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <RegularText style={{color: Color.tint, marginTop: 5}} onPress={handlePress}>
        Read more
      </RegularText>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <RegularText style={{color: Color.tint, marginTop: 5}} onPress={handlePress}>
        Show less
      </RegularText>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
  },
  cardBorder: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDDDDD',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  cardAction: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionLabel: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#424242',
  },
  cardActionText: {
    fontSize: 13,
    color: '#424242',
  },
  cardActionSubtitleText: {
    fontSize: 12,
    marginTop: -1,
    color: '#9E9E9E',
  }
})
