/*
 * Copyright (c) 2016 Untu, Inc.
 * This code is licensed under Eclipse Public License - v 1.0.
 * The full license text can be found in LICENSE.txt file and
 * on the Eclipse official site (https://www.eclipse.org/legal/epl-v10.html).
 */

export interface Logger {
  isDebug(): boolean;

  debug(...messages: any[]): void;

  info(...messages: any[]): void;

  warn(...messages: any[]): void;

  error(...messages: any[]): void;
}

export interface Actor {
  getLog(): Logger;

  getParent(): Actor;

  createChild(behaviour: ActorDefinition|Object, options?: Object): Promise<Actor>;

  send(topic: string, ...message: any[]): Promise<void>;

  sendAndReceive(topic: string, ...message: any[]): Promise<any>;
}

export interface ActorDefinition {
  initialize(selfActor: Actor): Promise<void>|void;

  destroy(): Promise<void>|void;
}

export interface ResourceDefinition<T> {
  initialize(system: ActorSystem): Promise<void>|void;

  destroy(): Promise<void>|void;

  getResource(): T;
}

export interface ActorSystem {
  rootActor(): Promise<Actor>;

  destroy(): Promise<void>;
}

export function createSystem(options: Object): ActorSystem;