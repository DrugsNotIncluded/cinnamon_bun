const $Rarity = Java.loadClass("net.minecraft.world.item.Rarity")
const $UnaryOperator = Java.loadClass("java.util.function.UnaryOperator")
const $UtilsJS = Java.loadClass("dev.latvian.mods.kubejs.util.UtilsJS")
const $Style = Java.loadClass("net.minecraft.network.chat.Style")
const withColorMethod = $Style.EMPTY.class.declaredMethods.filter((method) => method.name.includes("m_131148_"))[0]

function createRarity (/** @type {string} */ name, /** @type {number} */ colorCode) {
  let color = $UtilsJS.makeFunctionProxy("startup", $UnaryOperator, (style) => {
    return withColorMethod.invoke(style, Color.of(colorCode).createTextColorJS())
  })
  return $Rarity["create(java.lang.String,java.util.function.UnaryOperator)"](name, color)
}

createRarity("MAGICAL", 0xf8a2ec)

StartupEvents.registry('item', event => {
    let mechanism = (name, rarity) => {
		let id = name.toLowerCase()
		event.create(id + '_mechanism').texture("kubejs:item/" + id + "_mechanism").displayName(name + ' Mechanism').rarity(rarity ? rarity : 'COMMON')
		event.create('incomplete_' + id + '_mechanism').texture("kubejs:item/incomplete_" + id + "_mechanism").displayName('Incomplete ' + name + ' Mechanism')
	}

	let enchanted_mechanism = (name, rarity) => {
		let id = name.toLowerCase()
		event.create(id + '_mechanism').texture("kubejs:item/" + id + "_mechanism").displayName(name + ' Mechanism').rarity(rarity ? rarity : 'COMMON')
		event.create('incomplete_' + id + '_mechanism').glow(true).texture("kubejs:item/incomplete_" + id + "_mechanism").displayName('Incomplete ' + name + ' Mechanism')
	}

    mechanism('Kinetic')
	mechanism('Inductive', 'UNCOMMON')
	mechanism('Abstruse', 'RARE')
	enchanted_mechanism('Magical', 'MAGICAL')

	event.create('nickel_compound').texture("kubejs:item/nickel_compound").displayName('Nickel Compound')
    event.create('invar_compound').texture("kubejs:item/invar_compound").displayName('Unprocessed Invar Ingot')
	event.create('chromatic_resonator').texture("kubejs:item/chromatic_resonator").displayName('Chromatic Resonator').maxDamage(512).tooltip('Assembly tool')  //assembly tool
	event.create('missingno').texture("kubejs:item/missingno").displayName('∄')
	event.create('screwdriver').texture("kubejs:item/screwdriver").displayName('Screwdriver').maxDamage(512).tooltip('Assembly tool')  //assembly tool
	//event.create('living_core').texture("kubejs:item/living_core").displayName('Living core')
	//event.create('mechanical_core').texture("kubejs:item/mechanical_core").displayName('Mechanical core')
	event.create('invar_ingot').texture("kubejs:item/invar_ingot").displayName('Invar ingot')
	event.create('radiant_coil').glow(true).texture("kubejs:item/radiant_coil").displayName('Radiant Induction Coil')
	event.create('radiant_sheet').glow(true).texture("kubejs:item/radiant_sheet").displayName('Radiant Sheet')

	event.create('overcharged_red_corundum_cluster').texture("kubejs:item/overcharged_red_corundum_cluster").displayName('Overcharged Red Corundum').glow(true)
	event.create('overcharged_blue_corundum_cluster').texture("kubejs:item/overcharged_blue_corundum_cluster").displayName('Overcharged Blue Corundum').glow(true)
	event.create('overcharged_white_corundum_cluster').texture("kubejs:item/overcharged_white_corundum_cluster").displayName('Overcharged White Corundum').glow(true)
	event.create('algal_blend').texture("kubejs:item/algal_blend").displayName('Algal Blend')
	event.create('algal_brick').texture("kubejs:item/algal_brick").displayName('Algal Brick')
	event.create('eternal_ingot').texture("kubejs:item/eternal_ingot").displayName('Eternal Ingot').glow(true)
	event.create('grain_of_infinity').texture("kubejs:item/grain_of_infinity").displayName('Grain of Infinity').glow(true)
	event.create('corundum_dust').texture("kubejs:item/corundum_dust").displayName('Corundum Dust')
	event.create('corundum_seed_1').texture("kubejs:item/corundum_seed_1").displayName('Corundum Seed')
	event.create('corundum_seed_2').texture("kubejs:item/corundum_seed_2").displayName('Corundum Seed')
	event.create('corundum_seed_3').texture("kubejs:item/corundum_seed_3").displayName('Corundum Seed')
})

StartupEvents.registry('block', event => {
	event.create('invar_casing').material('metal').hardness(3.0).displayName('Invar Casing')
	event.create('machine_frame').model('kubejs:block/machine_frame').material('metal').hardness(4.0).displayName('Machine Frame')

    let machine = (name, layer) => {
		let id = name.toLowerCase()
		event.create(id + '_machine')
			.model('kubejs:block/' + id + '_machine')
			.material('lantern')
			.hardness(3.0)
			.displayName(name + ' Machine')
			.notSolid()
			.renderType(layer)
	}

	machine('Andesite', "solid")
	machine('Brass', "translucent")
	machine('Enderium', "cutout")
})

StartupEvents.registry('fluid', event => {
	event.create('abyssal_blend')
		.thickTexture(0x2f3247)
		.displayName('Abyssal Blend')
})