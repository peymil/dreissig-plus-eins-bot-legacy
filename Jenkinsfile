pipeline {
    agent {
      dockerfile true
    }
    stages {
        stage('Test') { 
            steps {
                sh 'echo test' 
            }
        }
        stage('Build') { 
            steps {
                sh 'docker buildx build  --push  --platform linux/arm/v7,linux/amd64 \ --tag 192.168.1.33:5000/dreissig-eins-plus-bot .' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'echo deploy' 
            }
        }
    }
}