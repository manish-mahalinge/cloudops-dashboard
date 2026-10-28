pipeline {
    agent any

    environment {
        APP_NAME = 'cloudops-dashboard'
        DOCKERHUB_USER = 'rootmanish'
        IMAGE_NAME = 'docker.io/rootmanish/cloudops-dashboard'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Unit Tests') {
            steps {
                sh '''
                    node --version
                    npm test
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('cloudops-sonarqube') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=cloudops-dashboard \
                          -Dsonar.sources=server.js \
                          -Dsonar.tests=test \
                          -Dsonar.test.inclusions=test/**/*.js
                    '''
                }
            }
        }

        stage('Dependency Security Scan') {
            steps {
                sh '''
                    dependency-check.sh \
                      --project "CloudOps Dashboard" \
                      --scan . \
                      --format HTML \
                      --out reports/dependency-check \
                      --failOnCVSS 7
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short=12 HEAD',
                        returnStdout: true
                    ).trim()

                    env.FULL_IMAGE = "${IMAGE_NAME}:${IMAGE_TAG}"
                }

                sh '''
                    docker build \
                      --pull \
                      -t "$FULL_IMAGE" .
                '''
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                    mkdir -p reports

                    trivy image \
                      --severity HIGH,CRITICAL \
                      --exit-code 1 \
                      --format table \
                      "$FULL_IMAGE"
                '''
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'main'
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DH_USER',
                        passwordVariable: 'DH_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x
                        echo "$DH_TOKEN" | docker login \
                          -u "$DH_USER" \
                          --password-stdin

                        docker push "$FULL_IMAGE"

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
            cleanWs()
        }

        success {
            echo 'CloudOps Dashboard CI completed successfully.'
        }

        failure {
            echo 'CI pipeline failed. Check stage logs.'
        }
    }
}
