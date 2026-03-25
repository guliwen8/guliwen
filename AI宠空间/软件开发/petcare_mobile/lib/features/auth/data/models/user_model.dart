class UserModel {
  final String id;
  final String nickname;
  final String phone;
  final String? avatar;

  UserModel({
    required this.id,
    required this.nickname,
    required this.phone,
    this.avatar,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      nickname: json['nickname'],
      phone: json['phone'],
      avatar: json['avatar'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nickname': nickname,
      'phone': phone,
      'avatar': avatar,
    };
  }
}
