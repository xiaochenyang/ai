import mongoose, { Schema, Document } from 'mongoose';

// DSL组件接口
interface IComponent {
  parentKey: string;
  childrenKeys: string[];
  style: Record<string, any>;
  componentProps: Record<string, any>;
}

// DSL文档接口
export interface IDSL extends Document {
  name: string;
  description: string;
  dsl: Record<string, IComponent>;
  naturalLanguage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// DSL Schema
const DSLSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dsl: { type: Schema.Types.Mixed, required: true },
  naturalLanguage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 更新时间中间件
DSLSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const DSL = mongoose.model<IDSL>('DSL', DSLSchema); 