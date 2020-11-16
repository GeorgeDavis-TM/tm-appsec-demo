const execSync = require('child_process').execSync;

exports.cmdExec = () => {
    var res = execSync('cat /home/ec2-user/tm-appsec-demo/trend_app_protect.json');
    
    return res.toString();
}

exports.workloadAttackExec = () => {
    var res = execSync('/usr/bin/python3 /home/ec2-user/cloudOneWorkloadSecurityDemo/cloud_one_workload_security_demo.py');
    return res.toString();
}