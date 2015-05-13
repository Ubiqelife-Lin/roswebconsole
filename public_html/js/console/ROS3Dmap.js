/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ROS3Dmap(ros, options) {

    options = options || {};
    var divName = options.divID || 'threed-map';
    var width = options.width || 200;
    var height = options.height || 200;

    // ----------------------------------------------------------------------
    // Rendering the robot in 3D
    // ----------------------------------------------------------------------

    // Create the scene manager and view port for the 3D world.
    var viewer3D = new ROS3D.Viewer({
        divID: divName,
        width: width,
        height: height,
        antialias: true
                //background: '#EEEEEE'
    });

    // Add a grid.
    viewer3D.addObject(new ROS3D.Grid({
        cellSize: 0.5
    }));

    // Create a TF client that subscribes to the fixed frame.
    var tfClient = new ROSLIB.TFClient({
        ros: ros,
        angularThres: 0.01,
        transThres: 0.01,
        rate: 20.0,
        //fixedFrame: '/base_link'
        fixedFrame: '/odometry'
    });

    // Add the URDF model of the robot.
    var urdfClient = new ROS3D.UrdfClient({
        ros: ros,
        tfClient: tfClient,
        rootObject: viewer3D.scene
    });
}