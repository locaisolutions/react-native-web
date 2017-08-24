Object.defineProperty(exports,"__esModule",{value:true});var _normalizeValue=require('./normalizeValue');var _normalizeValue2=_interopRequireDefault(_normalizeValue);var _processColor=require('../../modules/processColor');var _processColor2=_interopRequireDefault(_processColor);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var emptyObject={};var styleShortFormProperties={borderColor:['borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'],borderRadius:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'],borderStyle:['borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle'],borderWidth:['borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'],margin:['marginTop','marginRight','marginBottom','marginLeft'],marginHorizontal:['marginRight','marginLeft'],marginVertical:['marginTop','marginBottom'],overflow:['overflowX','overflowY'],padding:['paddingTop','paddingRight','paddingBottom','paddingLeft'],paddingHorizontal:['paddingRight','paddingLeft'],paddingVertical:['paddingTop','paddingBottom'],textDecorationLine:['textDecoration'],writingDirection:['direction']};var colorProps={backgroundColor:true,borderColor:true,borderTopColor:true,borderRightColor:true,borderBottomColor:true,borderLeftColor:true,color:true};var alphaSortProps=function alphaSortProps(propsArray){return propsArray.sort(function(a,b){if(a<b){return-1;}if(a>b){return 1;}return 0;});};var defaultOffset={height:0,width:0};var resolveShadow=function resolveShadow(resolvedStyle,style){var _ref=style.shadowOffset||defaultOffset,height=_ref.height,width=_ref.width;var offsetX=(0,_normalizeValue2.default)(null,width);var offsetY=(0,_normalizeValue2.default)(null,height);var blurRadius=(0,_normalizeValue2.default)(null,style.shadowRadius||0);var color=(0,_processColor2.default)(style.shadowColor,style.shadowOpacity);if(color){var boxShadow=offsetX+' '+offsetY+' '+blurRadius+' '+color;resolvedStyle.boxShadow=style.boxShadow?style.boxShadow+', '+boxShadow:boxShadow;}else if(style.boxShadow){resolvedStyle.boxShadow=style.boxShadow;}};var resolveTextShadow=function resolveTextShadow(resolvedStyle,style){var _ref2=style.textShadowOffset||defaultOffset,height=_ref2.height,width=_ref2.width;var offsetX=(0,_normalizeValue2.default)(null,width);var offsetY=(0,_normalizeValue2.default)(null,height);var blurRadius=(0,_normalizeValue2.default)(null,style.textShadowRadius||0);var color=(0,_processColor2.default)(style.textShadowColor);if(color){resolvedStyle.textShadow=offsetX+' '+offsetY+' '+blurRadius+' '+color;}};var mapTransform=function mapTransform(transform){var type=Object.keys(transform)[0];var value=(0,_normalizeValue2.default)(type,transform[type]);return type+'('+value+')';};var convertTransformMatrix=function convertTransformMatrix(transformMatrix){var matrix=transformMatrix.join(',');return'matrix3d('+matrix+')';};var resolveTransform=function resolveTransform(resolvedStyle,style){var transform=style.transform;if(Array.isArray(style.transform)){transform=style.transform.map(mapTransform).join(' ');}else if(style.transformMatrix){transform=convertTransformMatrix(style.transformMatrix);}resolvedStyle.transform=transform;};var createReducer=function createReducer(style,styleProps){var hasResolvedShadow=false;var hasResolvedTextShadow=false;return function(resolvedStyle,prop){var value=(0,_normalizeValue2.default)(prop,style[prop]);if(value==null){return resolvedStyle;}switch(prop){case'display':{resolvedStyle.display=value;if(style.display==='flex'){if(style.flexShrink==null){resolvedStyle.flexShrink=0;}if(style.flexBasis==null){resolvedStyle.flexBasis='auto';}}break;}case'aspectRatio':case'elevation':case'overlayColor':case'resizeMode':case'tintColor':{break;}case'flex':{if(value>0){resolvedStyle.flexGrow=value;resolvedStyle.flexShrink=1;resolvedStyle.flexBasis='0px';}else if(value===0){resolvedStyle.flexGrow=0;resolvedStyle.flexShrink=0;}else if(value===-1){resolvedStyle.flexGrow=0;resolvedStyle.flexShrink=1;}break;}case'shadowColor':case'shadowOffset':case'shadowOpacity':case'shadowRadius':{if(!hasResolvedShadow){resolveShadow(resolvedStyle,style);}hasResolvedShadow=true;break;}case'textAlignVertical':{resolvedStyle.verticalAlign=value==='center'?'middle':value;break;}case'textShadowColor':case'textShadowOffset':case'textShadowRadius':{if(!hasResolvedTextShadow){resolveTextShadow(resolvedStyle,style);}hasResolvedTextShadow=true;break;}case'transform':case'transformMatrix':{resolveTransform(resolvedStyle,style);break;}default:{var finalValue=value;if(colorProps[prop]){finalValue=(0,_processColor2.default)(value);}var longFormProperties=styleShortFormProperties[prop];if(longFormProperties){longFormProperties.forEach(function(longForm,i){if(styleProps.indexOf(longForm)===-1){resolvedStyle[longForm]=finalValue;}});}else{resolvedStyle[prop]=finalValue;}}}return resolvedStyle;};};var createReactDOMStyle=function createReactDOMStyle(style){if(!style){return emptyObject;}var styleProps=Object.keys(style);var sortedStyleProps=alphaSortProps(styleProps);var reducer=createReducer(style,styleProps);var resolvedStyle=sortedStyleProps.reduce(reducer,{});return resolvedStyle;};exports.default=createReactDOMStyle;