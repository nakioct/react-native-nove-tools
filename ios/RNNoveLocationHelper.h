#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNNoveLocationHelper : NSObject

@property (nonatomic,copy) NSString* addressName;

+ (instancetype)shared;
+ (NSString *)isOpenLocation;
+ (NSString *)checkFileExists:(NSString *)path;

- (NSString *)getLocationStatus;
- (void)startLocation;

@end

NS_ASSUME_NONNULL_END
