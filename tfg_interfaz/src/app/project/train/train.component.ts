import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrl: './train.component.css'
})
export class TrainComponent implements OnInit {
  tomlForm!: FormGroup;
  filename: string = 'config_lora.toml';
  train: boolean = false;
  files: string[] = [];
  loading: boolean = false;

  constructor(private dataservice: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadToml();
  }

  loadToml(): void {
    this.dataservice.cargar_config(this.filename).subscribe(data => {
      // Especificar solo los campos que queremos mostrar
      const filteredData = {
        bucket_no_upscale : data.bucket_no_upscale,
        bucket_reso_steps : parseInt(data.bucket_reso_steps, 10),
        cache_latents : data.cache_latents,
        caption_extension : data.caption_extension,
        clip_skip : parseInt(data.clip_skip,10),
        dynamo_backend : data.dynamo_backend,
        enable_bucket : data.enable_bucket,
        epoch : parseInt(data.epoch,10),
        gradient_accumulation_steps : parseInt(data.gradient_accumulation_steps,10),
        huber_c : parseFloat(data.huber_c),
        huber_schedule : data.huber_schedule,
        learning_rate : parseFloat(data.learning_rate),
        logging_dir : data.logging_dir,
        loss_type : data.loss_type,
        lr_scheduler : data.lr_scheduler,
        lr_scheduler_args : data.lr_scheduler_args,
        lr_scheduler_num_cycles : parseInt(data.lr_scheduler_num_cycles,10),
        lr_scheduler_power : parseInt(data.lr_scheduler_power,10),
        max_bucket_reso : parseInt(data.max_bucket_reso,10),
        max_data_loader_n_workers : parseInt(data.max_data_loader_n_workers,10),
        max_grad_norm : parseInt(data.max_grad_norm,10),
        max_timestep : parseInt(data.max_timestep,10),
        max_token_length : parseInt(data.max_token_length,10),
        max_train_steps : parseInt(data.max_train_steps,10),
        min_bucket_reso : parseInt(data.min_bucket_reso,10),
        mixed_precision : data.mixed_precision,
        network_alpha : parseInt(data.network_alpha,10),
        network_args : data.network_args,
        network_dim : parseInt(data.network_dim,10),
        network_module : data.network_module,
        noise_offset_type : data.noise_offset_type,
        optimizer_args : data.optimizer_args,
        optimizer_type : data.optimizer_type,
        output_dir : data.output_dir,
        output_name : data.output_name,
        pretrained_model_name_or_path : data.pretrained_model_name_or_path,
        prior_loss_weight : parseInt(data.prior_loss_weight,10),
        resolution : data.resolution,
        sample_prompts : data.sample_prompts,
        sample_sampler : data.sample_sampler,
        save_every_n_epochs : parseInt(data.save_every_n_epochs,10),
        save_model_as : data.save_model_as,
        save_precision : data.save_precision,
        seed : parseInt(data.seed,10),
        text_encoder_lr : parseFloat(data.text_encoder_lr),
        train_batch_size : parseInt(data.train_batch_size,10),
        train_data_dir : data.train_data_dir,
        training_comment : data.training_comment,
        unet_lr : parseFloat(data.unet_lr),
        xformers : data.xformers
      };

      this.tomlForm = this.fb.group(filteredData);
    }, error => {
      console.error('Error loading TOML file:', error);
    });
  }

  updateToml(): void {
    const updatedContent = {
      bucket_no_upscale : this.tomlForm.value.bucket_no_upscale,
      bucket_reso_steps : parseInt(this.tomlForm.value.bucket_reso_steps,10),
      cache_latents : this.tomlForm.value.cache_latents,
      caption_extension : this.tomlForm.value.caption_extension,
      clip_skip : parseInt(this.tomlForm.value.clip_skip,10),
      dynamo_backend : this.tomlForm.value.dynamo_backend,
      enable_bucket : this.tomlForm.value.enable_bucket,
      epoch : parseInt(this.tomlForm.value.epoch,10),
      gradient_accumulation_steps : parseInt(this.tomlForm.value.gradient_accumulation_steps,10),
      huber_c : parseFloat(this.tomlForm.value.huber_c),
      huber_schedule : this.tomlForm.value.huber_schedule,
      learning_rate : parseFloat(this.tomlForm.value.learning_rate),
      logging_dir : this.tomlForm.value.logging_dir,
      loss_type : this.tomlForm.value.loss_type,
      lr_scheduler : this.tomlForm.value.lr_scheduler,
      lr_scheduler_args : [],
      lr_scheduler_num_cycles : parseInt(this.tomlForm.value.lr_scheduler_num_cycles,10),
      lr_scheduler_power : parseInt(this.tomlForm.value.lr_scheduler_power,10),
      max_bucket_reso : parseInt(this.tomlForm.value.max_bucket_reso,10),
      max_data_loader_n_workers : parseInt(this.tomlForm.value.max_data_loader_n_workers,10),
      max_grad_norm : parseInt(this.tomlForm.value.max_grad_norm,10),
      max_timestep : parseInt(this.tomlForm.value.max_timestep,10),
      max_token_length : parseInt(this.tomlForm.value.max_token_length,10),
      max_train_steps : parseInt(this.tomlForm.value.max_train_steps,10),
      min_bucket_reso : parseInt(this.tomlForm.value.min_bucket_reso,10),
      mixed_precision : this.tomlForm.value.mixed_precision,
      network_alpha : parseInt(this.tomlForm.value.network_alpha,10),
      network_args : [],
      network_dim : parseInt(this.tomlForm.value.network_dim,10),
      network_module : this.tomlForm.value.network_module,
      noise_offset_type : this.tomlForm.value.noise_offset_type,
      optimizer_args : [],
      optimizer_type : this.tomlForm.value.optimizer_type,
      output_dir : this.tomlForm.value.output_dir,
      output_name : this.tomlForm.value.output_name,
      pretrained_model_name_or_path : this.tomlForm.value.pretrained_model_name_or_path,
      prior_loss_weight : parseInt(this.tomlForm.value.prior_loss_weight,10),
      resolution : this.tomlForm.value.resolution,
      sample_prompts : this.tomlForm.value.sample_prompts,
      sample_sampler : this.tomlForm.value.sample_sampler,
      save_every_n_epochs : parseInt(this.tomlForm.value.save_every_n_epochs,10),
      save_model_as : this.tomlForm.value.save_model_as,
      save_precision : this.tomlForm.value.save_precision,
      seed : parseInt(this.tomlForm.value.seed,10),
      text_encoder_lr : parseFloat(this.tomlForm.value.learning_rate),
      train_batch_size : parseInt(this.tomlForm.value.train_batch_size,10),
      train_data_dir : this.tomlForm.value.train_data_dir,
      training_comment : this.tomlForm.value.training_comment,
      unet_lr : parseFloat(this.tomlForm.value.learning_rate),
      xformers : this.tomlForm.value.xformers
    };

    this.dataservice.update_config(this.filename, updatedContent).subscribe(response => {
      console.log('TOML file updated:', response);
    }, error => {
      console.error('Error updating TOML file:', error);
    });
  }

  onButtonClick(): void {
    this.loading = true;
    this.dataservice.start_train().subscribe(response => {
      console.log('Response from backend:', response);
      this.dataservice.listFiles().subscribe(response => {
        this.files = response.files;
      });
      this.loading = false;
      this.train = true;
    }, error => {
      console.error('Error:', error);
    });
  }

  downloadFile(filename: string) {
    this.dataservice.downloadFile(filename).subscribe(response => {
      const blob = new Blob([response], { type: response.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
