'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the geometric ${chalk.red('generator-validation-check')} generator!`)
    );

    const prompts = [
      // {
      //   type: 'confirm',
      //   name: 'someAnswer',
      //   message: 'Would you like to enable this option?',
      //   default: true
      // },
      {
        type: 'input',
        name: 'proj',
        message: 'What is your project name?',
        default: 'foo'
      },
      {
        type: 'list',
        name: 'validation_type',
        message: 'What type of validation rule are you writing?',
        choices: [ "security", "quality", "compliance", "other" ]
      },       
      {
        type: 'list',
        name: 'technology_type',
        message: 'How do you plan on writing your validation check?',
        choices: [ "container", "custom" ]
      }, 
      {
        when: function (response) {
          return response.technology_type === "container";
        },
        type: 'list',
        name: 'container_image',
        message: 'What will you use to write your validation check?',
        choices: [ "alpine", "python", "java", "go" ] 
      },


      // {
      //   name: 'movie',
      //   type: 'confirm',
      //   message: 'Have you seen a movie lately?'
      // }, {
      //   when: function (response) {
      //     return response.movie;
      //   },
      //   name: 'good-or-not',
      //   message: 'Sweet! Was it any good?'
      // }
      
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('checks/'+this.props.validation_type+'/'+this.props.proj+'/README.md'),
      { proj: this.props.proj }
    );

    if (this.props.technology_type === 'container') {
    
      this.fs.copyTpl(
        this.templatePath('docker-compose.yml'),
        this.destinationPath('checks/'+this.props.validation_type+'/'+this.props.proj+'/docker-compose.yml'),
        { container_image: this.props.container_image }
        
      );

      this.fs.copyTpl(
        this.templatePath('makefile-container'),
        this.destinationPath('checks/'+this.props.validation_type+'/'+this.props.proj+'/makefile'),
        { proj: this.props.proj }
      );

      
    }

    if (this.props.technology_type === 'custom') {

      this.fs.copyTpl(
        this.templatePath('makefile-custom'),
        this.destinationPath('checks/'+this.props.validation_type+'/'+this.props.proj+'/makefile'),
        { proj: this.props.proj }
      );

      
    }    


  }

  // install() {
  //   this.installDependencies();
  // }
};
