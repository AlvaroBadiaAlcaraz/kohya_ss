import { Component } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrl: './requisitos.component.css'
})
export class RequisitosComponent {
  private filename: string = 'config_lora.toml';
  private content: any = {
    bucket_no_upscale : true,
    bucket_reso_steps : 64,
    cache_latents : true,
    caption_extension : ".txt",
    clip_skip : 1,
    dynamo_backend : "no",
    enable_bucket : true,
    epoch : 1,
    gradient_accumulation_steps : 1,
    huber_c : 0.1,
    huber_schedule : "snr",
    learning_rate : 0.0001,
    logging_dir : "",
    loss_type : "l2",
    lr_scheduler : "cosine",
    lr_scheduler_args : [],
    lr_scheduler_num_cycles : 1,
    lr_scheduler_power : 1,
    max_bucket_reso : 2048,
    max_data_loader_n_workers : 0,
    max_grad_norm : 1,
    max_timestep : 1000,
    max_token_length : 150,
    max_train_steps : 1496,
    min_bucket_reso : 256,
    mixed_precision : "fp16",
    network_alpha : 1,
    network_args : [],
    network_dim : 8,
    network_module : "networks.lora",
    noise_offset_type : "Original",
    optimizer_args : [],
    optimizer_type : "AdamW8bit",
    output_dir : "",
    output_name : "new model",
    pretrained_model_name_or_path : "runwayml/stable-diffusion-v1-5",
    prior_loss_weight : 1,
    resolution : "512,512",
    sample_prompts : "",
    sample_sampler : "euler_a",
    save_every_n_epochs : 1,
    save_model_as : "safetensors",
    save_precision : "fp16",
    seed : 0,
    text_encoder_lr : 0.0001,
    train_batch_size : 1,
    train_data_dir : "",
    training_comment : "Some training comment",
    unet_lr : 0.0001,
    xformers : true
  };

  enlace: string = 'https://www.clarifai.com/';


  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit(): void {
    this.createTomlFile();
  }

  private createTomlFile(): void {
    this.dataService.crearConfig(this.filename, this.content).subscribe(response => {
      console.log('TOML file created:', response);
    }, error => {
      console.error('Error creating TOML file:', error);
    });
  }

  param1: string = ""
  key: boolean = false

  onSubmit() {
    const params = {
      param1: this.param1
    };
    this.dataService.addKey(params).subscribe(response => {
      console.log('Key added:', response);
      this.key = true
    }, error => {
      console.error('Error adding key:', error);
    });
  }

  siguiente_paso() {
    this.router.navigate(['/entorno']);
  }
}