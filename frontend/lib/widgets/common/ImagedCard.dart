import 'package:flutter/material.dart';

class ImagedCard extends StatelessWidget {
  
  final Widget image, content, action;

  const ImagedCard({
    Key? key,
    required this.image,
    required this.content,
    required this.action
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          // Image widget
          ClipRRect(
            borderRadius: BorderRadius.vertical(top: Radius.circular(4.0)),
            child: AspectRatio(
              aspectRatio: 2,
              child: image 
            )
          ),

          Padding(
            padding: EdgeInsets.only(top: 4.0, left: 8.0, right: 8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                content,
                action
              ],
            ),
          )
        ],
      ),
    );
  }
}