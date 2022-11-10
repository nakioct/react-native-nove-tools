#import "RNNoveLocation.h"
#import <React/RCTUIManager.h>
#import "RNNoveLocationHelper.h"

@implementation RNNoveLocation

RCT_EXPORT_MODULE(LocationManager);


RCT_EXPORT_METHOD(getAddressNameWithcallback:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null],[RNNoveLocationHelper shared].addressName]);
}

RCT_EXPORT_METHOD(checkOpenLocation:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null],[RNNoveLocationHelper isOpenLocation],[[RNNoveLocationHelper shared] getLocationStatus]]);
}

RCT_EXPORT_METHOD(checkFileExistsWithVideoPath:(NSString *)videoPath ImagePath:(NSString *)imagePath callback:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null],[RNNoveLocationHelper checkFileExists:videoPath],[RNNoveLocationHelper checkFileExists:imagePath]]);
}

@end
