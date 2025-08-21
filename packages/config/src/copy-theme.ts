import { Command } from 'commander'
import fs from 'fs'

const program = new Command();
program
	.description('Use the appropriate theme for all application')
	.argument('<theme>', 'theme you want to use.');

program.parse();

const theme = program.args[0] ?? 'isa';

fs.copyFileSync(`${__dirname}/theme/tailwindcss.${theme}.ts`, `${__dirname}/tailwindcss.ts`);
