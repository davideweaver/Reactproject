import React, { Component, PropTypes } from "react"
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator, ScrollView, TouchableWithoutFeedback, Image } from "react-native"
import { RegularText, BoldText, SmallText } from "./styledText"
import ReadMore from "./readMore"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Styles, { Color, Dims } from "../styles"

export class CardGroup extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: null
  }

  render() {
    let header = null;
    if (this.props.title) {
        header = (<View style={styles.cardLabel}>
          <SmallText style={styles.cardLabelText}>
            {this.props.title.toUpperCase()}
          </SmallText>
        </View>)
    }
    else {
      header = (<CardGutter />)
    }
    return (
      <View>
        {header}
        <View style={[styles.cardGroup, this.props.style]}>
          {this.props.children}
        </View>
        <View style={styles.cardBorder} />
      </View>
    );
  }
}

export class Card extends Component {

  static propTypes = {
  }

  static defaultProps = {
    style: {}
  }

  setNativeProps(props) {
    this.refs["card"].setNativeProps(props);
  }

  render() {
    let contents = (<RegularText style={{color: this.props.tint}}>{this.props.text}</RegularText>);
    if (this.props.children)
      contents = this.props.children;
    let border = <View style={styles.cardBorder} />;
    return (
      <View ref={"card"}>
        {border}
        <View style={[styles.card, this.props.style]}>
          <View style={styles.cardBody}>
            {contents}
          </View>
        </View>
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
    onPress: PropTypes.func,
    tint: PropTypes.string,
    accessory: PropTypes.bool
  }

  static defaultProps = {
    ...Card.defaultProps,
    onPress: () => {},
    tint: Color.tint,
    accessory: false
  }

  render() {
    let contents = (<RegularText style={{color: this.props.tint}}>{this.props.text}</RegularText>);
    if (this.props.children)
      contents = this.props.children;
    let accessory = (<SimpleLineIcons name="arrow-right" size={12} color="#999" />);
    if (!this.props.accessory)
        accessory = null;
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Card {...this.props}>
          <View style={styles.touchableContainer}>
            <View style={{flex:1}}>
              {contents}
            </View>
            <View style={{justifyContent:"center"}}>
              {accessory}
            </View>
          </View>
        </Card>
      </TouchableHighlight>
    );
  }
}

export class MemoCard extends Component {
  render() {
    let { text } = this.props;
    return (
      <Card {...this.props}>
        <ReadMore
            numberOfLines={6}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}>
            <SmallText style={styles.cardText}>
            {text}
            </SmallText>
        </ReadMore>
      </Card>
    );
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <RegularText style={{color: Color.tint, marginTop: 7}} onPress={handlePress}>
        Read more
      </RegularText>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <RegularText style={{color: Color.tint, marginTop: 7}} onPress={handlePress}>
        Show less
      </RegularText>
    );
  }
}

export class InstagramPhotosCard extends React.Component {
  state = {
    images: null,
  }

  async componentDidMount() {
    this._isMounted = true;
    let { profile } = this.props;

    if (profile) {
      let response = await fetch(`https://www.instagram.com/${profile}/media/`);
      let data = await response.json();
      if (this._isMounted) {
        let images = data.items.map(item => ({
          imageUrl: item.images.standard_resolution.url,
          width: item.images.standard_resolution.width,
          height: item.images.standard_resolution.height,
          description: item.caption && item.caption.text,
        }));
        this.setState({images: images.slice(0, 6)});
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this._renderInstagramPhotos()
  }

  _renderInstagramPhotos() {
    let { images } = this.state;

    if (!images) {
      return (
        <Card {...this.props} style={styles.imageLoadingContainer}>
          <ActivityIndicator />
        </Card>
      );
    }

    return (
      <Card {...this.props} style={{marginRight: -20}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { images.map((image, i) => <InstagramPhoto key={i} item={image} list={images} />) }
        </ScrollView>
      </Card>
    );
  }
}

class InstagramPhoto extends React.Component {

  render() {
    let { item } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View>
            <Image
                ref={view => { this._view = view; }}
                source={{uri: item.imageUrl}}
                resizeMode="cover"
                style={styles.instagramImage}
            />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _handlePress = () => {
    let { item, list } = this.props;

    this._view.measure((rx, ry, w, h, x, y) => {
      openImageGallery({
        animationMeasurements: {w, h, x, y},
        list,
        item,
      });
    });
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
    paddingHorizontal: Dims.horzPadding,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: Dims.horzPadding,
    paddingBottom: 5,
  },
  cardLabelText: {
    color: '#6D6D72',
    fontSize: 8
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
  },
  touchableContainer: {
    flexDirection: "row"
  },
  imageLoadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 125,
    marginVertical: 10,
  },
  instagramImage: {
    width: 125,
    height: 125,
    marginVertical: 0,
    marginHorizontal: 0,
    marginRight: 10,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  }
})
