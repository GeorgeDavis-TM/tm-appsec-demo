const execSync = require('child_process').execSync;

exports.cmdExec = () => {
    var res = execSync('cat /home/ec2-user/tm-appsec-demo/trend_app_protect.json');
    
    return res.toString();
}

exports.workloadAttackExec = () => {
    var res = execSync('/usr/bin/python3 /home/ec2-user/cloudOneWorkloadSecurityDemo/cloud_one_workload_security_demo.py');
    return res.toString();
}

exports.conformityCfnExec = () => {
    var res = execSync('aws cloudformation create-stack --stack-name cloudonedemoteststack --region us-east-2 --template-body file:///home/ec2-user/tm-appsec-demo/scripts/misconfigured-cloudformation.json --parameters ParameterKey=VpcId,ParameterValue=vpc-67cf400e ParameterKey=SubnetId,ParameterValue=subnet-c1dc41a8');
    return res.toString();
}